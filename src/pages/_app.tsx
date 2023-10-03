import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import { Noto_Sans } from 'next/font/google';

const noto = Noto_Sans({weight:'700',style:'normal',subsets:['latin']})

export default function App({Component,pageProps}: any) {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Navbar/>
        <main style={noto.style}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </ChakraProvider>
  );
}
