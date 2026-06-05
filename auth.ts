import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/server/prisma";
import { comparePassword } from "@/lib/server/password";
import { loginSchema } from "@/lib/validation/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt"
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true
          }
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValidPassword = await comparePassword(
          parsed.data.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  events: {
    async createUser({ user }) {
      if (!user.id) return;

      await prisma.userPreference.create({
        data: {
          userId: user.id,
          healthGoals: [],
          allergies: [],
          medicalConditions: [],
          likedIngredients: [],
          cuisinePreferences: [],
          dislikedIngredients: [],
          texturePreferences: [],
          cookingStyles: [],
          appliances: []
        }
      });

      await prisma.notificationSetting.createMany({
        data: [
          {
            userId: user.id,
            key: "expiry_reminders",
            title: "Expiry reminders",
            description: "Notify me when food items are close to expiry",
            enabled: true
          },
          {
            userId: user.id,
            key: "low_stock",
            title: "Low stock alerts",
            description: "Notify me when pantry items are running low",
            enabled: true
          }
        ],
        skipDuplicates: true
      });
    }
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      delete token.picture;
      delete token.image;

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;

        
        session.user.image = null;
      }

      return session;
    }
  },

  pages: {
    signIn: "/login"
  }
};