import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Web3 from 'web3'


// Components
import Certificate from "../components/certificate";

// Styles
import styles from "../styles/pages/App.module.css";
import { POLYGON_NETWORK_TEST_ID } from "../utils/constants";

const App: NextPage = () => {
  const givenProvider = Web3.givenProvider;
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    const refetchAccounts = (web3: Web3) => {
      web3.eth.getAccounts().then(setAccounts);
    }

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
      console.error('No Metamask plugin')
      return;
    }
    const web3 = new Web3(Web3.givenProvider);
    const networkId = await web3.eth.net.getId();

    if (networkId !== POLYGON_NETWORK_TEST_ID) {
      // TODO show popup with ability to switch network
      console.error('Wrong network')
      return;
    }
    Web3.givenProvider.send('eth_requestAccounts')
  }

  const hasAccount = !!accounts.length

  return (
    <div className={styles.container}>
      <Head>
        <title>MeritBlock | Toolkit for creating NFT certificates</title>
        <meta name="description" content="TODO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <span>
          <Image
            src="/logo.svg"
            alt="MeritBlock Logo"
            width={220}
            height={38}
          />
        </span>
        <span>
          {!!accounts.length
            ? <div className={styles.primaryBtn}>{accounts[0]}</div>
            : <button className={styles.primaryBtn} onClick={connect}>Connect Wallet</button>
          }
        </span>
      </header>
      <main className={styles.main}>
        <div className={styles.certificateWrapper}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <Certificate
              name="Osama Jandali"
              courseName="web3Con"
              date="3/3/2022"
            />
          </div>
        </div>
        <div className={styles.editsWrapper}>
          <div className={styles.card}>
            <h1 className={styles.title}>Students Data</h1>
          </div>
          <div className={styles.card}>
            <h1 className={styles.title}>Customize Template</h1>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
