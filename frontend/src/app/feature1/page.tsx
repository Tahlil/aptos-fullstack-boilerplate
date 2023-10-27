"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Connected } from "../home/Connected";
import { NotConnected } from "../home/NotConnected";
import Navigation from "@/components/navigation";

export function Feature1() {
  const { connected } = useWallet();

  if (connected) return (
    <>
    <div className="p-9"></div>
     <Navigation />
     <Connected />
    </>
   
  )

  return <NotConnected />;
}

export default Feature1;
