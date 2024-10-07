export const setCorsHeaders = () => {
    return {
      "Access-Control-Allow-Origin": "*", // Adjust this to your frontend domain in production
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
}