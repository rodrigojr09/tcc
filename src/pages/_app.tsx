import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Noto_Sans, Tilt_Neon } from "next/font/google";
import Head from "next/head";

const noto = Noto_Sans({ weight: "700", style: "normal", subsets: ["latin"] });
export default function App({ Component, pageProps }: any) {
  return (
    <SessionProvider>
      <Head>
        <title>Suporte Eletro</title>
      </Head>
      <Navbar />
      <main style={noto.style}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
