import type { AppProps } from "next/app";
import "../global.css";
import "react-toastify/dist/ReactToastify.css";

import { GlobalProvider } from "@/contexts/globalContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
