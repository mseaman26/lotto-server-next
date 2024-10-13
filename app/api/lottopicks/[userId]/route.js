import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utils/helpers";

//find lotto picks by userId

export async function GET(req, {params}) {
    await connectMongoDB();

    const { userId } = params;

    try {
        const lottoPicks = await LottoPick.find({ userId });
        return NextResponse.json({ success: true, data: lottoPicks }, { status: 200, headers: setCorsHeaders() });
    } catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}