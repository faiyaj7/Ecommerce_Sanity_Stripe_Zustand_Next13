import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Kinbo",
  description: "Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main-container layout">
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
