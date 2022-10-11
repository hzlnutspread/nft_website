import { useEffect, useState } from "react";

const getData = async () => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then((res) => res.json())
    .then((data) => data);
  console.log(data);
  return data;
};

const Body = () => {
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
      <div className="relative flex flex-row flex-wrap items-center justify-center gap-10 bg-black px-8 pb-[100%] pt-[112px]">
        {dataToggle ? (
          <>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
            <div className=" h-[400px] w-[400px] border-2 border-solid border-orange-500 bg-black text-center text-white">{`${data.abilities[1].ability.name}`}</div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Body;
