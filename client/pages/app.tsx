import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { NFTStorage } from 'nft.storage'

// Components
import Certificate from "../components/certificate";

// Styles
import styles from "../styles/pages/App.module.css";
import { NFT_ADDRESS, NFT_STORAGE_API_KEY, POLYGON_NETWORK_TEST_ID } from "../utils/constants";
import abi from "../utils/meritBlockABI";

const App: NextPage = () => {
  const givenProvider = Web3.givenProvider;
  const [accounts, setAccounts] = useState<string[]>([]);
  const [certificateUri, setCertificateUri] = useState<string>('');

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

  useEffect(() => {
    if (certificateUri) {
      const upload = async () => {
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY })

        const result = await fetch(certificateUri)
        const blob = await result.blob();

        const ipfsURL = await nftstorage.store({
          name: 'test',
          description: 'test2',
          image: blob,
        })
      }

      upload();
    }
  }, [certificateUri])

  const mint = async () => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY })

    const result = await fetch(certificateUri)
    const blob = await result.blob();

    const uploadResult = await nftstorage.store({
      name: 'test',
      description: 'test2',
      image: blob,
    })

    console.log("Cert is uploaded!", uploadResult.url);

    const metadataUri = uploadResult.url + '';


    const recieverAddress = accounts[0]; // TODO replace with students address
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(abi, NFT_ADDRESS);

    try {
      await contract.methods
        .mint(recieverAddress, metadataUri)
        .send({ from: accounts[0] });
      console.log("Cert is minted!");
    } catch (e) {
      console.error("Something went bad");
    }
  };
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
          {!!accounts.length ? (
            <div className={styles.primaryBtn}>{accounts[0]}</div>
          ) : (
            <button className={styles.primaryBtn} onClick={connect}>
              Connect Wallet
            </button>
          )}
        </span>
      </header>
      <main className={styles.main}>
        <div className={styles.certificateWrapper}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <Certificate
              name="Osama Jandali"
              courseName="web3Con"
              date="3/3/2022"
              setCertificateUri={setCertificateUri}
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
          <button className={styles.primaryBtn} onClick={mint}>
            Mint
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
