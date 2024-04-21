import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";

import User from "@models/user"


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }) 
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({
                email:session.user.email
            });
            session.user.id= sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            console.log("User sign in");
            try{
                await connectToDB();
                //check if user exists
                const userExists = await User.findOne({
                    email:profile.email
                });
    
                //create new user
                if(!userExists){
                    console.log("New user sign In")
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    });
                }
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        }
    }
}
)
console.log("Next Auth");



export {handler as GET, handler as POST} ; 