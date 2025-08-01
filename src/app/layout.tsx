import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { CartProvider } from "@/providers/cart-provider";
import DialogProvider from "@/providers/dialog/DialogProvider";
import DialogSwitch from "@/features/dialogs/DialogSwitch";
import { TableProvider } from "@/providers/table-provider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iwaiter",
  description: "iWaiter - Your Digital Waiter",
  icons: {
    icon: 'https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico',
    shortcut: "https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico",
    apple: "https://digital-waiter-service.s3.eu-north-1.amazonaws.com/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <TableProvider>
            <CartProvider>
              <DialogProvider>
                {children}
                <ToastContainer />
                <DialogSwitch />
              </DialogProvider>
            </CartProvider>
          </TableProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
