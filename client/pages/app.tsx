import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

// Components
import Certificate from "../components/certificate";
import Students from "../components/students";

// Styles
import styles from "../styles/pages/App.module.css";

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
          <button className={styles.primaryBtn}>Connect Wallet</button>
        </span>
      </header>
      <main className={styles.main}>
        <div className={styles.certificateWrapper}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <Certificate
              name={preview.name}
              courseName="web3Con"
              date={preview.date}
            />
          </div>
        </div>
        <div className={styles.editsWrapper}>
          <div className={styles.card}>
            <Students setPreview={setPreview} />
          </div>
          <div className={styles.card}>
            <h4 className="main-title">Customize Template</h4>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default App;
