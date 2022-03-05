import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { NFTStorage } from "nft.storage";

const { svgAsPngUri } = require("save-svg-as-png");

// Components
import Header from "../components/header";
import Certificate from "../components/certificate";
import Students from "../components/students";
import Edits from "../components/edits";

// Styles
import styles from "../styles/pages/App.module.css";

// utils
import { NFT_ADDRESS, NFT_STORAGE_API_KEY } from "../utils/constants";
import abi from "../utils/meritBlockABI";
import { useWallet } from "../context/wallet-context";

type StudentData = {
  id: string;
  name: string;
  address: string;
  date: string;
};

const App: NextPage = () => {
  const [preview, setPreview] = useState<StudentData>({
    id: "",
    name: "",
    address: "",
    date: "",
  });

  const { accounts } = useWallet();
  const [certificateColor, setCertificateColor] = useState<string>("#eb1422");
  const [courseName, setCourseName] = useState<string>("");
  const [courseLogo, setCourseLogo] = useState<string>("");
  const certificateEl = useRef(null);

  const mint = async () => {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });

    const certificateUri = await svgAsPngUri(certificateEl.current);
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
      },
    });

    console.log("Cert is uploaded!", uploadResult.url);

    const metadataUri = uploadResult.url + "";

    const recieverAddress = preview.address;
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(abi, NFT_ADDRESS);

    try {
      await contract.methods
        .mint(recieverAddress, metadataUri)
        .send({ from: accounts[0] });
      console.log("Cert is minted!");
      return true;
    } catch (e) {
      console.error("Something went bad");
      return false;
    }
  };
  return (
    <div className="container">
      <Header />
      <main className={styles.main}>
        <div className={styles.certificateWrapper}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <Certificate
              name={preview.name}
              courseName={courseName}
              courseLogo={courseLogo}
              date={preview.date}
              certificateEl={certificateEl}
              certificateColor={certificateColor}
            />
          </div>
        </div>
        <div className={styles.editsWrapper}>
          <div className={styles.card}>
            <Students setPreview={setPreview} mint={mint} />
          </div>
          <div className={styles.card}>
            <Edits
              certificateColor={certificateColor}
              setCertificateColor={setCertificateColor}
              courseName={courseName}
              setCourseName={setCourseName}
              setCourseLogo={setCourseLogo}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
