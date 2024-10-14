import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";


//find lotto picks by userId

export async function GET(req, {params}) {

    if (req.method === "OPTIONS") {
        return NextResponse.json({}, { status: 200, headers: getCorsHeaders() });
    }
    await connectMongoDB();

    const { userId } = params;

    try {
        const lottoPicks = await LottoPick.find({ userId });
        return NextResponse.json({ success: true, data: lottoPicks }, { status: 200 });
    } catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500 });
    }
}