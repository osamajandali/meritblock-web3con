import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";

const myDarkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#F39721",
      error: "#EB1422",
      gradient: "linear-gradient(94.75deg, #f39721 0%, #eb1422 100%)",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={myDarkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
