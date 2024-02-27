import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        user_email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        user_pass: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { user_email, user_pass } = credentials;
        if (!user_email || !user_email) return null;

        const user = await prisma.user.findUnique({
          where: {
            user_email
          },
        });
        if (!user) return null;

        const passwordCorrect = await compare(user_pass, user.user_pass);
        if (!passwordCorrect) return null;
        console.log("Inicio de sesión correcto")
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
