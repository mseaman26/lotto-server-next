import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";


//find lotto picks by userId

export async function GET(req, {params}) {
    console.log('userid route')
    if (req.method === "OPTIONS") {
        return NextResponse.json({}, { status: 200});
    }
    await connectMongoDB();

    const { userId } = params;

    try {
        const lottoPicks = await LottoPick.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: lottoPicks }, { status: 200 });
    } catch (error) {
        console.error("Error getting lotto picks: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500 });
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
        return NextResponse.json({ success: true, data: lottoPick }, { status: 201});
    } catch (error) {
        console.log("Error creating lotto pick: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later: ", error }, { status: 500});
    }
}