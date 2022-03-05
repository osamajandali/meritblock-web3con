import type { NextPage } from "next";
import Image from "next/image";
import { Text, Button } from "@nextui-org/react";
import Link from "next/link";
import { ArrowRight } from "react-iconly";

// Components
import Header from "../components/header";

// Styles
import styles from "../styles/pages/Home.module.css";

const Section1 = () => {
  return (
    <section className={styles.section1}>
      <div className={styles.section1Left}>
        <Text h1>Toolkit for creating NFT certificates</Text>

        <Text css={{ marginBottom: 32 }} size="1.5rem">
          Create and customize certificates, mint them into NFT, and send them
          immediately to your students.
        </Text>
        <Link href="/app" passHref>
          <Button
            iconRight={<ArrowRight set="bold" primaryColor="currentColor" />}
            color="gradient"
            size="lg"
          >
            Launch App
          </Button>
        </Link>
      </div>
      <div>
        <Image
          className={styles.certificate}
          src="/certificate.svg"
          alt="MeritBlock Logo"
          width={717}
          height={622}
        />
      </div>
    </section>
  );
};

const Home: NextPage = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Section1 />
      </main>
    </div>
  );
};

export default Home;
