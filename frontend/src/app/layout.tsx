import { WalletProvider } from "@/context/WalletProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import "nes.css/css/nes.min.css";
import "./globals.css";


const kongtext = localFont({
  src: "./../../public/kongtext.ttf",
  variable: "--font-kongtext",
});

export const metadata: Metadata = {
  title: "Boilerplate",
  description: "Your new favorite on-chain pet",
};

export default function RootLayout({ children }: PropsWithChildren) {
  // const {connected} = useWallet()
  return (
    <html lang="en">
      <body className={kongtext.className}>
        {/* {connected ? <Navigation /> : ""} */}
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
