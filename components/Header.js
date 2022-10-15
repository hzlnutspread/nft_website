import Link from "next/link";

const Header = ({
  isReset,
  toggleReset,
  dataShowing,
  toggleData,
  setWalletAddress,
  setCollectionAddress,
}) => {
  const onClickHandler = () => {
    setWalletAddress("");
    setCollectionAddress("");
    console.log("resetting input fields");
    toggleReset((isReset = true));
    toggleData((dataShowing = false));
    console.log(isReset);
  };

  return (
    <>
      <div className="absolute z-10 flex h-20 w-full items-center justify-between bg-gray-700 px-16 py-2 text-lg font-bold">
        <div className="text-white ">CornOnTheCob</div>
        <div className="cursor-pointer text-white" onClick={onClickHandler}>
          <Link href="/">
            <a>Reset</a>
          </Link>
        </div>
      </div>

      <div className="absolute top-[40px] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-white ">
        Wallet Checker
      </div>
    </>
  );
};

export default Header;
