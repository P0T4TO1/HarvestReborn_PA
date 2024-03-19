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

        const user = await prisma.m_user.findUnique({
          where: {
            email: user_email,
          },
        });
        if (!user) return null;

        const passwordCorrect = await compare(user_password, user.password);
        if (!passwordCorrect) return null;
        console.log("Inicio de sesión correcto", user);

        if (user.id_rol === 2) {
          const negocio = await prisma.m_negocio.findFirst({
            where: {
              dueneg: {
                id_user: user.id,
              },
            },
          });
          return { ...user, negocio };
        } else if (user.id_rol === 3) {
          const cliente = await prisma.d_cliente.findFirst({
            where: {
              id_user: user.id,
            },
          });
          return { ...user, cliente };
        }

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
