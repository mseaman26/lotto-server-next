// pages/api/lottopick/[lottoPickId].js
import { connectMongoDB } from "../../../../../utils/mongodb"; // Adjust the import based on your folder structure
import LottoPick from "../../../../../models/LottoPick"; // Adjust the import based on your folder structure
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function OPTIONS() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', 'https://lotto-picker-rn-vite.vercel.app'); // Replace with your frontend URL
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new NextResponse(null, { status: 200, headers });
}

export async function DELETE(req, { params }) {
    await connectMongoDB();
    
    const { lottoPickId } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(lottoPickId)) {
        return new NextResponse(
            JSON.stringify({ success: false, errorMessage: "Invalid ID format" }),
            { status: 400 }
        );
    }

    try {
        // Use deleteOne to get the deleted count directly
        const { deletedCount } = await LottoPick.deleteOne({ _id: lottoPickId });

        if (deletedCount === 0) {
            return new NextResponse(
                JSON.stringify({ success: false, errorMessage: "Lotto pick not found" }),
                { status: 404 }
            );
        }

        // Return success response with deletedCount
        return new NextResponse(
            JSON.stringify({ success: true, deletedCount }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting lotto pick: ", error);
        return new NextResponse(
            JSON.stringify({ success: false, errorMessage: "Server error. Please try again later." }),
            { status: 500 }
        );
    }
}
