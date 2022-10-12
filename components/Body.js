import { useEffect, useState } from "react";
import Image from "next/image";

const reservoir_api_key = process.env.RESERVOIR_KEY;
const collectionId = "0xaAF03a65CbD8f01b512Cd8d530a675b3963dE255";
const myWalletAddress = "0xdf5a18A102627c2E9C1Ba8534D0DAD94B284f619";

const options = {
  method: "GET",
  headers: { accept: "*/*", "x-api-key": reservoir_api_key },
};

const getData = async () => {
  const data = await fetch(
    `https://api.reservoir.tools/users/${myWalletAddress}/tokens/v5?collection=${collectionId}&sortBy=acquiredAt&sortDirection=desc&offset=0&limit=15&includeTopBid=false`,
    options
  )
    .then((res) => res.json())
    .then((data) => data);
  console.log(data);
  return data;
};

const Body = ({ isReset }) => {
  const [data, setData] = useState([]);
  const [dataToggle, setDataToggle] = useState(false);

  const onClickHandler = async () => {
    const data = await getData();
    setData(data);
    setDataToggle(!dataToggle);
  };

  return (
    <>
      {/* Shows the button and the main div wrapper */}
      <div
        className={
          !dataToggle
            ? "flex h-full flex-wrap items-center justify-center bg-black text-lg font-bold"
            : "hidden"
        }
      >
        <button
          className={
            !dataToggle
              ? "rounded-lg bg-blue-500 py-2 px-4 text-white"
              : "hidden"
          }
          onClick={onClickHandler}
        >
          Check out my collection
        </button>
      </div>

      {/* Shows the layout of all the NFTs */}

      {dataToggle ? (
        <div
          className={
            isReset === true
              ? "hidden"
              : "grid grid-cols-2 gap-5 overflow-hidden bg-black px-8 pb-16 pt-[112px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          }
        >
          {data.tokens.map((token, index) => {
            return (
              <div
                className=" flex flex-col items-center justify-center overflow-hidden rounded-xl border-[1px] border-solid border-orange-500"
                key={index}
              >
                <Image
                  src={token.token.image}
                  width={290}
                  height={290}
                  alt=""
                />
                <div className="w-full border-[1px] border-solid border-orange-500 bg-black text-center text-white">{`${token.token.tokenId}`}</div>
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
