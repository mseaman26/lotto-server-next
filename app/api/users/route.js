import { connectMongoDB } from "@/utils/mongodb";
import User from "@/models/User";
import Auth from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    try {
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    }catch (error) {
        console.error("Error getting users: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500});
    }
  }
  
  export async function POST(request) {
        await connectMongoDB();
    
        const body = await request.json();
        const { username, email, password } = body;
    
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ success: false, errorMessage: "User with this email already exists" }, { status: 400 });
            }
            const user = await User.create({ username, email, password });
            console.log("User created: ", user);
            const token = Auth.signToken(user);
            return NextResponse.json({ success: true, data: token }, { status: 201});
        } catch (error) {
            console.log("Error creating user: ", error);
            return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500 });
        }
  }
