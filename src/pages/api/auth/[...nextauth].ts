import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma/prisma';
import { User } from '../../../utils/types';

export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                rm: { type: 'text' },
                password: { type: 'password' },
            },
            authorize: async function(credentials,req){
                const user = await prisma.users.findUnique({ where: { rm: credentials?.rm } }) as any;
                if(!user) return null;
                user.email = user.rm;
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return url;
        },
        async session({ session, user, token }:any) {
            const userDb = await prisma.users.findUnique({ where: { rm: session.user.email }})
            session.user = userDb;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        }
    }
})