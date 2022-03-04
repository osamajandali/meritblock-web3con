import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { NFTStorage } from "nft.storage";

// Components
import Certificate from "../components/certificate";
import Students from "../components/students";

// Styles
import styles from "../styles/pages/App.module.css";
import {
  NFT_ADDRESS,
  NFT_STORAGE_API_KEY,
  POLYGON_NETWORK_TEST_ID,
} from "../utils/constants";
import abi from "../utils/meritBlockABI";
import Edits from "../components/edits";

type StudentData = {
  id: string;
  name: string;
  address: string;
  date: string;
};

const App: NextPage = () => {
  const [preview, setPreview] = useState<StudentData>({
    id: "",
    name: "STUDENT NAME ",
    address: "",
    date: "DATE ",
  });

  const givenProvider = Web3.givenProvider;
  const [accounts, setAccounts] = useState<string[]>([]);
  const [certificateUri, setCertificateUri] = useState<string>("");
  const [certificateColor, setCertificateColor] = useState<string>("#eb1422");
  const [courseName, setCourseName] = useState<string>("");

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

  const mint = async () => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });

    const result = await fetch(certificateUri);
    const blob = await result.blob();

    const uploadResult = await nftstorage.store({
      name: courseName,
      description: `MeritBlock - ${courseName}`,
      image: blob,
      properties: {
        courseName,
        name: preview.name,
        date: preview.date,
      }
    });

    console.log("Cert is uploaded!", uploadResult.url);

    const metadataUri = uploadResult.url + "";

    const recieverAddress = preview.address
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
              name={preview.name}
              courseName={courseName}
              date={preview.date}
              setCertificateUri={setCertificateUri}
              certificateColor={certificateColor}
            />
          </div>
        </div>
        <div className={styles.editsWrapper}>
          <div className={styles.card}>
            <Students setPreview={setPreview} />
          </div>
          <div className={styles.card}>
            <Edits
              certificateColor={certificateColor}
              setCertificateColor={setCertificateColor}
              courseName={courseName}
              setCourseName={setCourseName}
            />
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
