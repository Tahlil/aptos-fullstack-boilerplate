"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "@/utils/env";
import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

export function Connected() {
  const [greeting, setGreeting] = useState<String>("test");
  const [newGreeting, setNewGreeting] = useState<String>("test");
  const [greetingIsSet, setGreetingIsSet] = useState(false);
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);
  const { account, network, signAndSubmitTransaction } = useWallet();

  const updateGreetingFromContract = async () => {
    const value = await client.getAccountResources(
      NEXT_PUBLIC_CONTRACT_ADDRESS
    );
    console.log({ value });
    setGreetingIsSet(true);
    setGreeting(value[0].data.greeting.toString());
  }

  const fetchValue = useCallback(async () => {
    if (!account?.address) return;
    try {
      await updateGreetingFromContract();
    } catch (e: any) {
      setGreetingIsSet(false);
    }
  }, [account?.address]);

  const updateGreeting = async () => {
    if (!account?.address) return;
    setTransactionInProgress(true);
    const payload = {
      type: "entry_function_payload",
      function: `${NEXT_PUBLIC_CONTRACT_ADDRESS}::test::update_greeting`,
      type_arguments: [],
      arguments: [newGreeting],
    };
    console.log({newGreeting})
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      const res = await client.waitForTransaction(response.hash);
      await updateGreetingFromContract();
    } catch (error) {
      console.log("error", error);
    }
    finally {
      setTransactionInProgress(false);
    }
  };

  useEffect(() => {
    if (!account?.address || !network) return;

    fetchValue();
  }, [account?.address, fetchValue, network]);

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="text-center">
        <p className="font-medium">
          Connected to
          <p className="bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {network?.name}
          </p>
        </p>
        <p className="font-medium">
          Connected address
          <p className="bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {account?.address}
          </p>
        </p>
        <div className="container mx-auto p-11">
        {greetingIsSet ? <p>Greeting: 
          <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">{greeting}</span>
          </p> : <p>Greeting not set</p>}
          </div>

        <div>
          <div className="flex rounded-md shadow-sm m-11">
          <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">New Greetings</span>
            <input
              type="text"
              onChange={(event) => setNewGreeting(event.target.value + "")}
              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Add a new greeting"
            />
          
          </div>
          <button
              onClick={updateGreeting} 
              className="p-3"
              style={{ height: "40px", backgroundColor: "#3f67ff" }}
            >
              Update greeting
            </button>
        </div>
      </div>
    </div>
  );
}
