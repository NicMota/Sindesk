
import NextAuth, { getServerSession, NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { redirect,useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export const authConfig : NextAuthOptions = {

  
  providers:[
    GoogleProvider({
      
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      
    }),
    CredentialsProvider({
      name:'Sign in',
      credentials:{
        email:{
          label:"Email",
          type:'email',
          placeholder:'example@example.com'
        },
        password:{label:"Password", type:"password"}
      },
      async authorize(credentials){
        if(!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.user.findFirst({where:{email:credentials.email}});
        if(!dbUser)
          return null
        const res = await bcrypt.compare(credentials.password,dbUser.password);
        if(res){
          const user = {name:dbUser.username,email:dbUser.email};
          return user as User;
        }
        return null;
      },
      
    }),
    
   
  ],
  session:{
    strategy:'jwt',
    maxAge: 7 * 24 * 60 * 60,
  }

  
};

