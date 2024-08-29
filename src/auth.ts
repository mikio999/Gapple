import NextAuth from 'next-auth';
import Naver from 'next-auth/providers/naver';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Naver],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
