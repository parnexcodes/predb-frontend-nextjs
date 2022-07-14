import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('../components/utils/ProgessBar'));

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ProgressBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
