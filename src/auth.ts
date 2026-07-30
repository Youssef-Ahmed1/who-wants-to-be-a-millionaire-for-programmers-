// src/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./lib/mongodb";
import { User } from "./models/user";
import bcrypt from "bcryptjs";



{
    /*
    first doing  the basic hooks of
    handlers , singIn , singOut and auth that all have
     in common  the email and the password
     and makes sure that the credentials
     match the database while it waits
      for the database to connect
      and searches for the user in the database
      via email to make sure that the user exists
      and then makes sure that the password matches
      with the database password that is salted
    */
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                await connectToDatabase();
                const user = await User.findOne({
                    email: credentials.email,
                }).select("+password");
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password,
                );
                if (!passwordsMatch) return null;
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
});
