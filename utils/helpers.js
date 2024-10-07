export const setCorsHeaders = (req, res) => {
    const allowedOrigins = ['https://lotto-picker-rn-vite.vercel.app/']; // Add allowed domains here
    const origin = req.headers.origin;
  
    // Allow specific origins in production, and "*" in development if necessary
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      // Fallback for dev or when you want to allow all origins
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
  
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Terminate the OPTIONS request with a 200 status
      return;
    }
  };
  