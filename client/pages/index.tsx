import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/pages/Home.module.css";

// Components
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Header />
    </div>
  );
};

export default Home;
