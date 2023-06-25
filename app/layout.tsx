import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthContext from "@/components/AuthContext/AuthContext";
import ActiveStatus from "@/components/ActiveStatus/ActiveStatus";

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
        <AuthContext>
          <Toaster /> {/** for notifications */}
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
