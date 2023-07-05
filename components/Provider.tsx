'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import { getSession } from 'next-auth/react';

type Props = {
  children: ReactNode;
  session: Session | null | undefined;
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: { session },
//   };
// }

const Provider: FC<Props> = ({ children, ...otherProps }) => {
  const { session } = otherProps;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
