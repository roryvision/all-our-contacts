import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/search',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { id, password } = credentials as {
          id: string;
          password: string;
        };

        try {
          const response = await supabase
            .from('group')
            .select()
            .eq('id', id)
            .eq('password', password);

          if (response.error) {
            console.error('Supabase error:', response.error);
            throw new Error('Authentication failed');
          }

          if (response.data.length == 0) {
            throw new Error('Incorrect credentials');
          }
        } catch (error: any) {
          console.error('Authorization error:', error.message);
          return null;
        }

        return { id, password };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
