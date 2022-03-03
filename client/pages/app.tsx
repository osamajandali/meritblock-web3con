import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

// Components
import Certificate from "../components/certificate";

// Styles
import styles from "../styles/pages/App.module.css";

const App: NextPage = () => {
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
