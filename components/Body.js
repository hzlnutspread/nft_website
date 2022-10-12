import { useEffect, useState } from "react";
import Image from "next/image";

const reservoir_api_key = process.env.RESERVOIR_KEY;
const collectionId = "0xaAF03a65CbD8f01b512Cd8d530a675b3963dE255";
const myWalletAddress = "0xdf5a18A102627c2E9C1Ba8534D0DAD94B284f619";
const API_LIMIT = 100;

const options = {
  method: "GET",
  headers: { accept: "*/*", "x-api-key": reservoir_api_key },
};

const getData = async () => {
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

const Body = ({ isReset, toggleReset, dataShowing, toggleData }) => {
  const [data, setData] = useState([]);

  const onClickHandler = async () => {
    const data = await getData();
    setData(data);
    toggleData((dataShowing = true));
    toggleReset((isReset = false));
    console.log(dataShowing);
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
                className="overflow-hidden rounded-[4px_4px_4px_4px] border-[4px] border-double border-white"
              >
                <div className="relative pb-[100%]">
                  <Image src={token.token.image} layout="fill" />
                </div>
                <div className="w-fullbg-black text-center text-white">{`#${token.token.tokenId}`}</div>
                <div className="w-full cursor-pointer rounded-[0px_0px_4px_4px]  bg-blue-500  p-3 text-center text-white">
                  Show Stats
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Body;
