import { connectMongoDB } from "../../../utils/mongodb";
import LottoPick from "../../../models/LottoPick";
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
        return new NextResponse(JSON.stringify({ success: true, data: lottoPicks }), { status: 200 });
    }catch (error) {
        console.error("Error getting lotto picks: ", error);
        return new NextResponse(JSON.stringify({ success: false, errorMessage: "Server error. Please try again later" }), { status: 500});
    }
}
export async function DELETE(request) {
    await connectMongoDB();
    const body = await request.json();
    const { id } = body;
    console.log('id', id)
    try {
        const deletedPick = await LottoPick.deleteOne({ _id: id });
        return new NextResponse(JSON.stringify({ success: true, data: deletedPick }), { status: 200 });
    }catch (error) {
        console.error("Error deleting lotto pick: ", error);
        return new NextResponse(JSON.stringify({ success: false, errorMessage: "Server error. Please try again later" }), { status: 500});
    }
}


