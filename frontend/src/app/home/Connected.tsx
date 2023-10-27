"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "@/utils/env";
import { AptosClient } from "aptos";


const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");


export function Connected() {
  const [greeting, setGreeting] = useState<String>("test");
  const [greetingIsSet, setGreetingIsSet] = useState(false);
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);
  const { account, network } = useWallet();

  const fetchValue = useCallback(async () => {
    if (!account?.address) return;
    try {
      console.log("The addresses:")
    
      console.log(account?.address)
      console.log(NEXT_PUBLIC_CONTRACT_ADDRESS)
      const value = await client.getAccountResources(
        NEXT_PUBLIC_CONTRACT_ADDRESS
      );
      console.log({value})
      setGreetingIsSet(true);
      setGreeting(value[0].data.greeting.toString());

    } catch (e: any) {
      setGreetingIsSet(false);
    }
   
  }, [account?.address]);

  const updateGreeting = async () => {
    const payload = {
      type: "entry_function_payload",
      function: `${NEXT_PUBLIC_CONTRACT_ADDRESS}::test::create_list`,
      type_arguments: [],
      arguments: [],
    };
  }


  useEffect(() => {
    if (!account?.address || !network) return;

    fetchValue();
  }, [account?.address, fetchValue, network]);

  return (
    <div className="flex flex-col gap-3 p-3">
       <div className="text-center">
        <p className="font-medium">Connected to 
        <p className="bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{network?.name}</p>
         </p>
        <p className="font-medium">Connected address  
        <p className="bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{account?.address}</p>
        </p>
        {greetingIsSet ?
        <p>Greeting: {greeting}</p>
        :
        <p>Greeting not set</p>
        }
        
      </div>
    </div>
  );
}
