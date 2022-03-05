import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  MouseEventHandler,
} from "react";
import Web3 from "web3";

import { POLYGON_NETWORK_TEST_ID } from "../utils/constants";

const WalletContext = createContext(undefined);

function WalletProvider(props: any) {
  const [accounts, setAccounts] = useState<string[]>([]);
  const givenProvider = Web3.givenProvider;

  useEffect(() => {
    const refetchAccounts = (web3: Web3) => {
      web3.eth.getAccounts().then(setAccounts);
    };

    if (givenProvider) {
      const web3 = new Web3(givenProvider);

      refetchAccounts(web3);

      const updateInterval = setInterval(() => refetchAccounts(web3), 1000);
      return () => {
        clearInterval(updateInterval);
      };
    }
  }, [givenProvider]);
  const connect = async () => {
    if (!givenProvider) {
      // TODO show popup with instructions
      console.error("No Metamask plugin");
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    const networkId = await web3.eth.net.getId();

    if (networkId !== POLYGON_NETWORK_TEST_ID) {
      // TODO show popup with ability to switch network
      console.error("Wrong network");
      return;
    }
    Web3.givenProvider.send("eth_requestAccounts");
  };
  return <WalletContext.Provider value={{ accounts, connect }} {...props} />;
}

type UseWallet = {
  accounts: string[];
  connect: MouseEventHandler<HTMLButtonElement>;
};
function useWallet(): UseWallet {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error(`useWallet must be used within a WalletProvider`);
  }
  return context;
}

export { WalletProvider, useWallet };
