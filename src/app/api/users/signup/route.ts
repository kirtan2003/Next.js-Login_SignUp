import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect()

export async function POST(request: NextRequest): Promise<NextResponse>{
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        //validation
        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already registered" }, {status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword    
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered successfully",
            success: true,
            savedUser,

        }, {status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

