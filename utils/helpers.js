export const setCorsHeaders = () => {
    return {
      "Access-Control-Allow-Origin": 'https://lotto-picker-rn-vite.vercel.app', 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  };
  