import { useEffect, useState } from "react";
import Image from "next/image";
import ModalView from "../components/ModalView";
import Spinner from "./Spinner";

// CONSTANTS
const reservoir_api_key = process.env.RESERVOIR_KEY;
const API_LIMIT = 100;
const options = {
  method: "GET",
  headers: { accept: "*/*", "x-api-key": reservoir_api_key },
};

// CHOOSE WHICH PROJECT TO SHOW
const getCollectionData = async (walletAddress, collectionAddress) => {
  let data = [];
  let lastRunCount = 0;
  do {
    const apiData = await fetch(
      `https://api.reservoir.tools/users/${walletAddress}/tokens/v5?collection=${collectionAddress}&sortBy=acquiredAt&sortDirection=desc&offset=${data.length}&limit=${API_LIMIT}&includeTopBid=false`,
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
const getTokenMetaData = async (tokenId, collectionAddress) => {
  const data = await fetch(
    `https://api.reservoir.tools/tokens/v5?tokens=${collectionAddress}%3A${tokenId}&sortBy=floorAskPrice&limit=20&includeTopBid=false&includeAttributes=true`,
    options
  )
    .then((res) => res.json())
    .then((data) => data);
  return data;
};

// START OF THE MAIN BODY
const Body = ({
  isReset,
  toggleReset,
  dataShowing,
  toggleData,
  isModal,
  toggleModal,
  walletAddress,
  setWalletAddress,
  collectionAddress,
  setCollectionAddress,
}) => {
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [modalView, setModalToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e) => {
    if (walletAddress === "" || collectionAddress === "") {
      alert("Don't leave any fields blank!");
      return;
    }
    console.log("Fetching data");
    e.preventDefault();
    setLoading(true);
    const data = await getCollectionData(walletAddress, collectionAddress);
    setData(data);
    toggleData((dataShowing = true));
    toggleReset((isReset = false));
    setLoading(false);
  };

  const onShowStatsHandler = async (tokenId, collectionAddress) => {
    console.log("getting Meta Data");
    setLoading(true);
    const metaData = await getTokenMetaData(tokenId, collectionAddress);
    setMetaData(metaData);
    setModalToggle(!modalView);
    setLoading(false);
  };

  return (
    <>
      {/* Shows the input form */}
      {loading ? (
        <Spinner />
      ) : (
        <div
          className={
            !dataShowing
              ? "flex h-full flex-col flex-wrap items-center justify-center bg-black text-lg font-bold"
              : "hidden"
          }
        >
          <div className="examples-box mb-4 flex flex-col items-center justify-center rounded-lg border-[4px] border-double border-white bg-white/20 p-2 text-white">
            <div>Test it out!</div>
            <div>
              <div>
                My wallet:{" "}
                <span className="text-[16px] font-normal">
                  0x15eF2FFc8e6Fb95Ff9964eBF29AFFE665d343e2B
                </span>
              </div>
              <div>
                The Seekers collection:{" "}
                <span className="text-[16px] font-normal">
                  0xaAF03a65CbD8f01b512Cd8d530a675b3963dE255
                </span>
              </div>
            </div>
          </div>
          <form
            id="input_form"
            onSubmit={(walletAddress, collectionId) => {
              onClickHandler(walletAddress, collectionId);
            }}
            className="flex flex-col items-center justify-center rounded-[8px] border-[4px] border-double bg-white/20 p-4 "
          >
            <fieldset className="pb-6">
              <label>
                <p className="py-[4px] text-center text-white">
                  Wallet Address
                </p>
                <input
                  name="walletAddress"
                  placeholder="e.g. 0xdf5..."
                  onChange={(e) => setWalletAddress(e.target.value)}
                  value={walletAddress}
                  className="text-md rounded-lg  p-2 duration-100 focus:scale-[1.05] focus:outline-0 "
                  autoComplete="off"
                />
              </label>
            </fieldset>

            <fieldset className="pb-6">
              <label>
                <p className="pb-[4px] text-center text-white">Collection Id</p>
                <input
                  name="collectionAddress"
                  placeholder="e.g. 0x354..."
                  onChange={(e) => setCollectionAddress(e.target.value)}
                  value={collectionAddress}
                  className="text-md rounded-lg p-2 duration-100 focus:scale-[1.05] focus:outline-0"
                  autoComplete="off"
                />
              </label>
            </fieldset>

            <button
              className="rounded-lg bg-blue-500 py-2 px-4 text-white"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      )}

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
                className="overflow-hidden rounded-[8px_8px_8px_8px] border-[4px] border-double border-white duration-100 hover:scale-[1.05]"
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
                    onShowStatsHandler(token.token.tokenId, collectionAddress);
                  }}
                >
                  Show Stats
                </div>
              </div>
            );
          })}
          {modalView ? (
            <ModalView
              isModal={modalView}
              toggleModal={setModalToggle}
              modalMetaData={metaData}
            />
          ) : null}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Body;
