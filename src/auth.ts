// src/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./lib/mongodb";
import { User } from "./models/user";
import bcrypt from "bcryptjs";


export const{ handlers , signIn , signOut, auth}= NextAuth({

    providers:[ CredentialsProvider({
        name: "Credentials",
        credentials:{
            email: {label:"Email", type: "email"},
            password:{label: "Password", type: "password"}
        }, async authorize(credentials) {
            if(!credentials?.email || !credentials?.password)return null;
            await connectToDatabase();
                const user = await User.findOne({email: credentials.email})
                if(!user)return null;

const passwordsMatch = await bcrypt.compare(credentials.password as string,
    user.passoword
);
if(!passwordsMatch)return null;
return{ id: user._id.toString(), name: user.name, email: user.email};
            }


    })],
    pages:{
        signIn: '/login',
    }
});
