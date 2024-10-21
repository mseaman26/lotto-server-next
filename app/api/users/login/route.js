// pages/api/auth/login.js
import { connectMongoDB } from "@/utils/mongodb";
import User from "@/models/User";
import Auth from "@/utils/auth"; // Assuming you have a utility for signing tokens
import { NextResponse } from "next/server";
import {setCorsHeaders} from '@/utils/helpers'

export async function OPTIONS() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://lotto-picker-rn-vite.vercel.app'); // Set the exact origin
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Return 200 OK for the preflight request
    return new NextResponse(null, { status: 200, headers });
}

export async function POST(request) {
    console.log('here')
    await connectMongoDB();

    if (request.method === 'OPTIONS') {
        // Respond to preflight request
        
        return new NextResponse.json({success: true, data: token}, { status: 200, headers: setCorsHeaders() });
      }

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
        console.log('Email and password are required');
        return new NextResponse(JSON.stringify({ success: false, errorMessage: "Email and password are required" }), { status: 400, headers: setCorsHeaders() });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
        return new NextResponse.json({ success: false, errorMessage: "Invalid email or password" }, { status: 401, headers: setCorsHeaders() });
        }

        // Check if the provided password is valid
        const isPasswordValid = await user.isPasswordValid(password);
        if (!isPasswordValid) {
        return new NextResponse.json({ success: false, errorMessage: "Invalid email or password" }, { status: 401 });
        }

        // If successful, sign a token and return user data (excluding password)
        const { password: _, ...userData } = user.toObject(); // Exclude password
        const token = Auth.signToken(user); // Assuming you have a method for signing JWT tokens
        console.log('token', token);
        return new NextResponse(JSON.stringify({ success: true, data: token }), { status: 200, headers: setCorsHeaders() });
    } catch (error) {
        console.error("Error during login: ", error);
        return new NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders()});
    }
}
