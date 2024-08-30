import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID,
      clientSecret: process.env.AUTH_NAVER_SECRET,
      authorization: {
        params: {
          grant_type: 'authorization_code',
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
