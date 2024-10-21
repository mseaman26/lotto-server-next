//route that takes in a list of numbers and a lotto game name and checks if they are unique to all others of that game

import { connectMongoDB } from "@/utils/mongodb";
import LottoPick from "@/models/LottoPick";
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

export async function POST(request) {
    console.log("Checking uniqueness of lotto pick");
    await connectMongoDB();

    const body = await request.json();
    const { gameName, numbers, drawDate } = body;
    console.log(drawDate)

    try {
        const existingPicks = await LottoPick.find({ gameName, drawDate });
        const isUnique = existingPicks.every((pick) => pick.numbers.join() !== numbers.join());
        return NextResponse.json({ success: true, data: isUnique }, { status: 200 });
    } catch (error) {
        console.log("Error checking uniqueness: ", error);
        return NextResponse.json({ success: false, errorMessage: "Server error. Please try again later" }, { status: 500 });
    }
}
