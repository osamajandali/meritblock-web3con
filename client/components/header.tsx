import Head from "next/head";
import Image from "next/image";
import { Button, Text } from "@nextui-org/react";

import { useWallet } from "../context/wallet-context";

// Styles
import styles from "../styles/components/Header.module.css";

export default function Header() {
  const { accounts, connect } = useWallet();
  return (
    <>
      <Head>
        <title>MeritBlock | Toolkit for creating NFT certificates</title>
        <meta
          name="description"
          content="Create and customize certificates, mint them into NFT, and send them
          immediately to your students"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.wrapper}>
        <span>
          <Image
            src="/logo.svg"
            alt="MeritBlock Logo"
            width={150}
            height={26}
          />
        </span>
        <span>
          {!!accounts.length ? (
            <Text
              weight="bold"
              css={{
                textGradient: "94.75deg, #f39721 0%, #eb1422 100%",
              }}
            >
              {accounts[0].slice(0, 5)}...
              {accounts[0].slice(accounts[0].length - 5, accounts[0].length)}
            </Text>
          ) : (
            <Button auto color="gradient" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </span>
      </header>
    </>
  );
}
