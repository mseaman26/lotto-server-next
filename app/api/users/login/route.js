// pages/api/auth/login.js
import { connectMongoDB } from "@/utils/mongodb";
import User from "@/models/User";
import Auth from "@/utils/auth"; // Assuming you have a utility for signing tokens
import { setCorsHeaders } from "@/utils/helpers";


export async function POST(request) {
  console.log('login route hit');
  await connectMongoDB();

  const body = await request.json();
  const { email, password } = body;

  // Validate input
  if (!email || !password) {
    console.log('Email and password are required');
    return new Response(JSON.stringify({ success: false, errorMessage: "Email and password are required" }), { status: 400, headers: setCorsHeaders() });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return new Response(JSON.stringify({ success: false, errorMessage: "Invalid email or password" }), { status: 401, headers: setCorsHeaders() });
    }

    // Check if the provided password is valid
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ success: false, errorMessage: "Invalid email or password" }), { status: 401, headers: setCorsHeaders() });
    }

    // If successful, sign a token and return user data (excluding password)
    const { password: _, ...userData } = user.toObject(); // Exclude password
    const token = Auth.signToken(user); // Assuming you have a method for signing JWT tokens
    return new Response(JSON.stringify({ success: true, data: { user: userData, token } }), { status: 200 });
  } catch (error) {
    console.error("Error during login: ", error);
    return new Response(JSON.stringify({ success: false, errorMessage: "Internal server error" }), { status: 500, headers: setCorsHeaders() });
  }
}
