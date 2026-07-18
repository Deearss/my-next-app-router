import { login, loginWithGoogle } from "@/libs/firebase/service";
import { UserType } from "@/types/usertype";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await login({ email, password });

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOGGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOGGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token = { ...token, ...user };
      }

      if (account?.provider === "google") {
        const result = await loginWithGoogle({
          fullname: user.name,
          email: user.email,
        });
        token = { ...token, ...result };
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = { ...session.user, ...token };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
