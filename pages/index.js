import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Body from "../components/Body";
import ModalView from "../components/ModalView";

export default function Home() {
  const [reset, setReset] = useState(false);
  const [dataToggle, setDataToggle] = useState(false);

  return (
    <div>
      <Head>
        <title>{`CornHub`}</title>
        <meta name="description" content="Check out my NFTs :)" />
        <link rel="icon" href="/favicorn.ico" />
      </Head>

      <main className="relative h-screen w-screen overflow-x-hidden bg-black">
        <Header
          isReset={reset}
          toggleReset={setReset}
          dataShowing={dataToggle}
          toggleData={setDataToggle}
        />
        <Body
          isReset={reset}
          toggleReset={setReset}
          dataShowing={dataToggle}
          toggleData={setDataToggle}
        />
      </main>
    </div>
  );
}
