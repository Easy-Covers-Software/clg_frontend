import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

import { isJwtExpired, makeUrl } from '@/client/constants/Utils';


export const refreshToken = async (refreshToken) => {
  try{
    const response = await axios.post(
      'http://localhost:8000/api/token/refresh/',
      // makeUrl(
      //   process.env.BACKEND_BASE_URL,
      //   'token',
      //   'refresh',
      // ),
      {
        refresh: refreshToken,
      },
    );

    const { access, refresh } = response.data;
    return [access, refresh]
  } catch (error) {
    return [null, null]
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  debug: process.env.NODE_ENV === 'development',

  // FLOW: jwt -> session
  // 1. user logs in with google and the login endpoint
  // 2. the jwt function is called, which is used to add the access_token to the jwt token
  // 3. the session function is called, which is used to add the jwt token to the session
  //* Each time the session is called in useSession(), getSession(), the jwt() and session callbacks are run again
  //* As such, the refreshing mechansism needs tobe done in the jwt() callback
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const { id_token } = account;
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/google/",
            // makeUrl(
            //   process.env.BACKEND_API_BASE,
            //   "social",
            //   "login",
            //   account.provider,
            // ),
            {
              access_token: id_token,
              id_token: id_token
            },
          );

          // extract the returned token from the DRF backend and add it to the `user` object          
          const { user, tokens } = response.data;
          const { access_token, refresh_token } = tokens
          
          token = {
            ...token,
            access_token: access_token,
            refresh_token: refresh_token,
          };


          return token;
        } catch (error) {
          console.log('error: user not found');
          // console.log(error)
          return false;

        }
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if(isJwtExpired(token.access_token)){
        const [
          newAccessToken,
          newRefreshToken,
        ] = await refreshToken(token.refresh_token);

        if(newAccessToken && newRefreshToken) {
          token = {
            ...token,
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60) 
          };
          return token;
        }

        // unable to refresh tokens from DRF backend, invalidate the token
        return {
          ...token,
          exp: 0,
        }
      }
      return token;
    },

    async session({ session, token }) {
      const { name, email, picture, access_token, refresh_token } = token;
      
      const tokens = {
        access_token,
        refresh_token,
      }

      const user = {
        info: {
          name,
          email,
          picture,
        },
        tokens
      }
      session.user = user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
