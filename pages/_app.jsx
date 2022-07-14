import "../styles/globals.css";
import { Provider } from "jotai";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('../components/utils/ProgessBar'));

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
    <ChakraProvider>
      <ProgressBar />
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
