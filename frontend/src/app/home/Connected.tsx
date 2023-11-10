"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "@/utils/env";
import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

export function Connected() {
  const [greeting, setGreeting] = useState<String>("test");
  const [address, setAddress] = useState<String>("");
  const [newGreeting, setNewGreeting] = useState<String>("test");
  const [greetingIsSet, setGreetingIsSet] = useState(false);
  const [accountIsWhitelisted, setAccountIsWhitelisted] = useState(false);
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);
  const { account, network, signAndSubmitTransaction } = useWallet();

  const updateGreetingFromContract = async () => {
    const value = await client.getAccountResources(
      NEXT_PUBLIC_CONTRACT_ADDRESS
    );
    console.log({ value });
    setAccountIsWhitelisted(value[0].data.whitelist.inline_vec.includes(account?.address+""))
    setGreetingIsSet(true);
    setGreeting(value[1].data.greeting.toString());
  };
  
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
    console.log({ newGreeting });
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await client.waitForTransaction(response.hash);
      await updateGreetingFromContract();
    } catch (error) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const whitelistAddress = async () => {
    if (!account?.address) return;
    setTransactionInProgress(true);
    console.log({ address });
    const payload = {
      type: "entry_function_payload",
      function: `${NEXT_PUBLIC_CONTRACT_ADDRESS}::test::whitelist_event_manager`,
      type_arguments: [],
      arguments: [address],
    };
 
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log({response})
      // wait for transaction
      await client.waitForTransaction(response.hash);
    } catch (error) {
      console.log("error", error);
      console.log({error});
    } finally {
      setTransactionInProgress(false);
    }
  };

  const createEvent = async () => {
    if (!account?.address) return;
    setTransactionInProgress(true);
    console.log({ address });
    const payload = {
      type: "entry_function_payload",
      function: `${NEXT_PUBLIC_CONTRACT_ADDRESS}::test::mint_event`,
      type_arguments: [],
      arguments: ["eventCollection", "Test desc", 11, "name", "https://images.lumacdn.com/cdn-cgi/image", "as", "df", "jk"],
    };
 
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log({response})
      // wait for transaction
      await client.waitForTransaction(response.hash);
    } catch (error) {
      console.log("error", error);
      console.log({error});
    } finally {
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
          {greetingIsSet ? (
            <p>
              Greeting:
              <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                {greeting}
              </span>
            </p>
          ) : (
            <p>Greeting not set</p>
          )}
        </div>

        <div>
          <div className="flex rounded-md shadow-sm m-11">
            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              New Greetings
            </span>
            <input
              type="text"
              onChange={(event) => setNewGreeting(event.target.value + "")}
              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Add a new greeting"
            />
          </div>
          {transactionInProgress ? (
            <div role="status" className="flex items-center justify-center p-5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              onClick={updateGreeting}
              className="p-3"
              style={{ height: "40px", backgroundColor: "#3f67ff" }}
            >
              Update greeting
            </button>
          )}
        </div>

        <div>
        <div className="flex rounded-md shadow-sm m-11">
            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              Address to Whitelist
            </span>
            <input
              type="text"
              onChange={(event) => setAddress(event.target.value + "")}
              className="py-2 px-12 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="public address"
            />
          </div>  

          <div className="flex items-center justify-center">
            <button
              onClick={whitelistAddress}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Whitelist Address 📝
            </button>
          </div>

          <div className='flex'>
        <div className='p-10 bg-gradient-to-r from-purple-100'>
                 <h1 className="text-2xl">Account Type: <span className="text-purple-600">{
                 NEXT_PUBLIC_CONTRACT_ADDRESS === account?.address ? "Admin" : (accountIsWhitelisted ? "Whitelisted Event Manager" : "Customer")
                 } </span>  </h1>

        </div>
    </div>

    <div className="flex items-center justify-center m-2">
            <button
              onClick={createEvent}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Create Event 📢
            </button>
          </div>


          <div>
         
</div>
        
        </div>

      </div>
    </div>
  );
}
