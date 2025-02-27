import { connect } from "@/dbConfig/dbConfig";

import { NextResponse, NextRequest } from "next/server";


connect()

export async function GET(request: NextRequest){
    try {
        const response =  NextResponse.json({
            message: "User Logged in successfully",
            success: true,
        }, {status: 201});

        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}