//route that takes in a list of numbers and a lotto game name and checks if they are unique to all others of that game

import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
import { NextResponse } from "next/server";
import { setCorsHeaders } from "@/utils/helpers";

export async function POST(request) {
    await connectMongoDB();

    const body = await request.json();
    const { gameName, numbers } = body;

    try {
        const existingPicks = await LottoPick.find({ gameName });
        const isUnique = existingPicks.every((pick) => pick.numbers.join() !== numbers.join());
        return NextResponse.json({ success: true, data: isUnique }, { status: 200, headers: setCorsHeaders() });
    } catch (error) {
        console.log("Error checking uniqueness: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500, headers: setCorsHeaders() });
    }
}
