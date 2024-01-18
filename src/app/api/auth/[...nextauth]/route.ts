import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from '@/lib/supabase';

const handler = NextAuth ({
  session: {
    strategy: 'jwt'
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

        const response = await supabase
          .from('group')
          .select()
          .eq('id', id)
          .eq('password', password);

        const group = { id, password };

        if (group) {
          return group;
        } else {
          return null;
        }
      }
    })
  ]
})

export { handler as GET, handler as POST };
