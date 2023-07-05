import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

import axios from 'axios';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn(userLoggedIn) {
      const { user, account, profile } = userLoggedIn;
      const { id_token } = account;

      try {
        const response = await axios.post(
          'http://localhost:8000/api/social/login/google/',
          {
            access_token: id_token,
          },
        );

        const { access_token } = response.data;
        user.access_token = access_token;
        return true;
      } catch (error) {
        // console.log('Error exchanging tokens: ', error);
        return false;
      }
    },

    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        const { access_token } = user;
        token.access_token = access_token;
      }

      if (account) {
        const { id_token } = account;
        token.id_token = id_token;
      }

      return token;
    },

    async session(session, user) {
      session.access_token = user.access_token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
