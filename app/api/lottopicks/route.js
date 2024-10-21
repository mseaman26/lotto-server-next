import { connectMongoDB } from "../../../utils/mongodb";
import LottoPick from "../../../models/User";
import { NextResponse } from "next/server";

export async function OPTIONS() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://lotto-picker-rn-vite.vercel.app'); // Set the exact origin
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Return 200 OK for the preflight request
    return new NextResponse(null, { status: 200, headers });
}


export async function GET(request) {
    await connectMongoDB();

    try {
        const lottoPicks = await LottoPick.find({});
        return NextResponse.json({ success: true, data: lottoPicks }, { status: 200 });
    }catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500});
    }
}


