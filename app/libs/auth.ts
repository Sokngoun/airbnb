// prisma adapter
import { PrismaAdapter } from "@auth/prisma-adapter";

// next auth
import NextAuth, { NextAuthOptions  } from "next-auth";

// github provider
import GitHubProvider from "next-auth/providers/github";

// google provider
import GoogleProvider from "next-auth/providers/google";

// prisma db
import prisma from "@/app/libs/prismadb";

// credentials proivder
import CredentialsProvider from "next-auth/providers/credentials";

// import bcrypt
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions  = {
  adapter: PrismaAdapter(prisma),
    //   provider 
  providers: [
    // GitHub Provider 
    GitHubProvider({
      clientId: process.env.GITHUB_ID! as string,
      clientSecret: process.env.GITHUB_SECRET! as string,
    }),
    // Google Provider 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials Provider 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
     //   checking authorize 
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // find user 
        const user = await prisma.user.findUnique({
            where:{
                email: credentials.email
            }
        })

        // if user not found or user has no password
        if(!user || !user.hashPassword){
            throw new Error("Invalid credentials")
        }
        // compare new password with old password 
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashPassword)

        // if password is not correct
        if(!isCorrectPassword){
            throw new Error("Invalid credentials")
        }

        return user;
      },
    }),
  ],
};
