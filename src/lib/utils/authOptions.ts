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
        user_password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { user_email, user_password } = credentials;
        if (!user_email || !user_password) return null;

        const user = await prisma.user.findUnique({
          where: {
            user_email,
          },
        });
        if (!user) return null;

        if (user.role_id === 2) {
          const business = await prisma.business.findFirst({
            where: {
              user_id: user.id,
            },
          });
          if (!business) return null;
          return { ...user, business };
        } else if (user.role_id === 3) {
          const organization = await prisma.organization.findFirst({
            where: {
              user_id: user.id,
            },
          });
          if (!organization) return null;
          return { ...user, organization };
        }

        const passwordCorrect = await compare(
          user_password,
          user.user_password
        );
        if (!passwordCorrect) return null;
        console.log("Inicio de sesión correcto", user);

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
    newUser: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
