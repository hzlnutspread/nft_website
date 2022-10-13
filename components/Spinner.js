const Spinner = () => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-[1] flex items-center justify-center bg-black/60">
      <div className="spinner-container flex h-full flex-wrap items-center justify-center ">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
