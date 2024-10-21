import { connectMongoDB } from "../../../utils/mongodb";
import LottoPick from "../../../models/User";
import { NextResponse } from "next/server";


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


