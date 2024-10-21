import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utils/helpers";


//find lotto picks by userId
export async function OPTIONS() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://lotto-picker-rn-vite.vercel.app'); // Set the exact origin
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Return 200 OK for the preflight request
    return new NextResponse(null, { status: 200, headers });
}

export async function GET(req, {params}): Promise<NextResponse> {
    console.log('userid route')
    if (req.method === "OPTIONS") {
        const response = new NextResponse(null, { status: 200, headers: setCorsHeaders() });
        return response;
    }
    await connectMongoDB();

    const { userId } = params;

    try {
        const lottoPicks = await LottoPick.find({ userId }).sort({ createdAt: -1 });
        
        return  NextResponse.json({ success: true, data: lottoPicks }, { status: 200, headers: setCorsHeaders() });
    } catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}

export async function POST(req, {params}) {
    await connectMongoDB();
    const { userId } = params;

    const body = await req.json();
    const { gameName, numbers, drawDate } = body;

    try {
        console.log('draw date', drawDate);
        const lottoPick = await LottoPick.create({ gameName, numbers, userId, drawDate });
        console.log("Lotto pick created: ", lottoPick);
        return NextResponse.json({ success: true, data: lottoPick }, { status: 201, headers: setCorsHeaders() });
    } catch (error) {
        console.log("Error creating lotto pick: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later: ", error }, { status: 500, headers: setCorsHeaders() });
    }
}