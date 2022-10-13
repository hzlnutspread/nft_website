const ModalView = ({ isModal, toggleModal }) => {
  return (
    <>
      <div
        className="fixed left-0 top-0 right-0 bottom-0 z-[1] flex items-center justify-center bg-black/50"
        onClick={() => toggleModal(!isModal)}
      >
        <div className="z-[2] w-[300px] rounded-xl bg-white py-[10px] px-4 ">
          <div className="border-b-[2px] text-xl">
            <h4>Header</h4>
          </div>
          <div className="pt-2">Body content</div>
        </div>
      </div>
    </>
  );
};

export default ModalView;
