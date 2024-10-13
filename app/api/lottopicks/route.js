import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utils/helpers";

export async function GET(request) {
    await connectMongoDB();

    try {
        const lottoPicks = await LottoPick.find({});
        return NextResponse.json({ success: true, data: lottoPicks }, { status: 200, headers: setCorsHeaders() });
    }catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}

export async function POST(request) {
    await connectMongoDB();

    const body = await request.json();
    const { gameName, numbers, userId } = body;

    try {
        const lottoPick = await LottoPick.create({ gameName, numbers, userId });
        console.log("Lotto pick created: ", lottoPick);
        return NextResponse.json({ success: true, data: lottoPick }, { status: 201, headers: setCorsHeaders() });
    } catch (error) {
        console.log("Error creating lotto pick: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}
