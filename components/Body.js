import { useEffect, useState } from "react";
import Image from "next/image";
import ModalView from "../components/ModalView";

// CONSTANTS
const reservoir_api_key = process.env.RESERVOIR_KEY;
const collectionId = "0xaAF03a65CbD8f01b512Cd8d530a675b3963dE255";
const myWalletAddress = "0xdf5a18A102627c2E9C1Ba8534D0DAD94B284f619";
const API_LIMIT = 100;

const options = {
  method: "GET",
  headers: { accept: "*/*", "x-api-key": reservoir_api_key },
};

// CHOOSE WHICH PROJECT TO SHOW
const getCollectionData = async () => {
  let data = [];
  let lastRunCount = 0;
  do {
    const apiData = await fetch(
      `https://api.reservoir.tools/users/${myWalletAddress}/tokens/v5?collection=${collectionId}&sortBy=acquiredAt&sortDirection=desc&offset=${data.length}&limit=${API_LIMIT}&includeTopBid=false`,
      options
    )
      .then((res) => res.json())
      .then((data) => data);

    lastRunCount = apiData.tokens.length;
    data = [...data, ...apiData.tokens];
    console.log(data.length);
  } while (lastRunCount === API_LIMIT);

  console.log(data);
  return data;
};

// GET THE METADATA FOR EACH NFT

// START OF THE MAIN BODY
const Body = ({
  isReset,
  toggleReset,
  dataShowing,
  toggleData,
  isModal,
  toggleModal,
}) => {
  const [data, setData] = useState([]);
  const [tokenId, setTokenId] = useState();
  const [metaData, setMetaData] = useState([]);
  const [modalView, setModalToggle] = useState(false);

  const onClickHandler = async () => {
    const data = await getCollectionData();
    setData(data);
    toggleData((dataShowing = true));
    toggleReset((isReset = false));
    console.log(dataShowing);
  };

  const getTokenMetaData = async () => {
    const data = await fetch(
      `https://api.reservoir.tools/tokens/v5?tokens=${collectionId}%3A${tokenId}&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=true`,
      options
    )
      .then((res) => res.json())
      .then((data) => data);
    console.log(data);
    return data;
  };

  const onShowStatsHandler = async () => {
    const metaData = await getTokenMetaData();
    setMetaData(metaData);
    setModalToggle(!modalView);
  };

  return (
    <>
      {/* Shows the button and the main div wrapper */}
      <div
        className={
          !dataShowing
            ? "flex h-full flex-wrap items-center justify-center bg-black text-lg font-bold"
            : "hidden"
        }
      >
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-white"
          onClick={onClickHandler}
        >
          Check out my collection
        </button>
      </div>

      {/* Shows the layout of all the NFTs */}

      {dataShowing ? (
        <div
          className={
            isReset === true
              ? "hidden"
              : "grid grid-cols-2 gap-5 overflow-hidden bg-black px-8 pb-16 pt-[112px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          }
        >
          {data.map((token, index) => {
            return (
              <div
                key={index}
                className="overflow-hidden rounded-[0px_0px_8px_8px] border-[4px] border-double border-white"
              >
                <div className="relative pb-[100%]">
                  <Image src={token.token.image} layout="fill" alt="" />
                </div>
                <div
                  className="w-fullbg-black border-[1px] border-white text-center text-white"
                  id="token-id"
                >{`#${token.token.tokenId}`}</div>
                <div
                  className="w-full cursor-pointer rounded-[0px_0px_4px_4px] bg-blue-500  p-3 text-center text-white"
                  onClick={() => {
                    setTokenId(token.token.tokenId);
                    onShowStatsHandler();
                  }}
                >
                  Show Stats
                </div>
              </div>
            );
          })}
          {modalView ? (
            <ModalView isModal={modalView} toggleModal={setModalToggle} />
          ) : null}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Body;
