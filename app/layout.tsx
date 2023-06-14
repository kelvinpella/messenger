import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Messenger - Let's chat!",
  description: "Chat with an individual or create groups in messenger.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster /> {/** for notifications */}
        {children}
      </body>
    </html>
  );
}
