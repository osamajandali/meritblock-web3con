import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import { WalletProvider } from "../context/wallet-context";

import "../styles/globals.css";

const myDarkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#F39721",
      error: "#EB1422",
      gradient: "linear-gradient(94.75deg, #f39721 0%, #eb1422 100%)",
    },
    fonts: {
      sans: "'Josefin Sans', sans-serif",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <NextUIProvider theme={myDarkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </WalletProvider>
  );
}

export default MyApp;
