import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest): Promise<NextResponse>{
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        //validation
        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User does not exists" }, {status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password" }, {status: 400});
        }

        const tokenData  = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn: '1d'});

        const response =  NextResponse.json({
            message: "User Logged in successfully",
            success: true,
        }, {status: 201});

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

