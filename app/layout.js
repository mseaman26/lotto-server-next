// app/layout.js or app/layout.tsx
import './globals.css'; // or your main stylesheet
import { Metadata } from 'next';

export const metadata = {
  title: 'Your App Title',
  description: 'Description of your app',
  icons: {
    icon: '/assets/favicon.ico', // Pointing to your favicon
    apple: '/assets/apple-touch-icon.png', // If you have an apple touch icon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/favicon.ico" />
        {/* Other head elements */}
      </head>
      <body>{children}</body>
    </html>
  );
}
