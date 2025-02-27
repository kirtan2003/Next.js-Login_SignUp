import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";


connect();

export async function POST(request: NextRequest){
    try {
        //get data from token
        const userId = getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({message: "User Not Found!"}, {status: 400});
        }

        return NextResponse.json({
            message: "User Found",
            data: user,
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}