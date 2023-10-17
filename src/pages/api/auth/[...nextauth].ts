import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma/prisma';
//import { User } from '../../../utils/types';

export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                rm: { type: 'text' },
                password: { type: 'password' },
            },
            authorize: async function(credentials,req){
                const user = await prisma.users.findUnique({ where: { rm: credentials?.rm as string } }) as any;
                const result:User = {name:"",email:user?.email||"",id:user?.id||"12345"};
                if(!user) return null;
                if(user.password){
                    if(user.password !== credentials?.password) return null;
                    result.name = user.rm;
                    return result;
                }else{
                    if(credentials?.password !== user.cpf.split(".").join("").replace("-", "") && credentials?.password !== user.cpf) return null;
                    result.name = user.rm;
                    return result;
                }
            }
        })
    ],
    pages: {
        error: "/auth/error",
        signIn: "/auth/login"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return url;
        },
        async session({ session, user, token }:any) {
            const userDb = await prisma.users.findUnique({ where: { rm: session.user.name }})
            session.user = userDb;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        }
    }
})