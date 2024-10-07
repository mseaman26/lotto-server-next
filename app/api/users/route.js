import { connectMongoDB } from "@/utils/mongodb";
import User from "@/models/User";
import Auth from "@/utils/auth";



export async function GET(request) {
    await connectMongoDB();

    try {
        const users = await User.find({});
        return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
    }catch (error) {
        console.error("Error getting users: ", error);
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
  }
  
  export async function POST(request) {
        await connectMongoDB();
    
        const body = await request.json();
        const { username, email, password } = body;
    
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return new Response(JSON.stringify({ success: false, errorMessage: "User with this email already exists" }), { status: 400 });
            }
            const user = await User.create({ username, email, password });
            const token = Auth.signToken(user);
            return new Response(JSON.stringify({ success: true, data: token }), { status: 201 });
        } catch (error) {
            console.log("Error creating user: ", error);
            return new Response(JSON.stringify({ success: false, errorMessage: 'Server error. Please try again later' }), { status: 400 });
        }
  }
