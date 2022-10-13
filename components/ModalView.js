const ModalView = ({ isModal, toggleModal, modalMetaData }) => {
  return (
    <>
      <div
        className="fixed left-0 top-0 right-0 bottom-0 z-[1] flex items-center justify-center bg-black/60"
        onClick={() => toggleModal(!isModal)}
      >
        <div className="z-[2] w-[350px] rounded-xl border-[4px] border-double bg-black py-[10px] px-4 text-white">
          <div className="pb-4 text-center text-2xl">
            <h4>Attributes for #{modalMetaData.tokens[0].token.tokenId}</h4>
          </div>
          <div className="pb-2">
            {modalMetaData.tokens[0].token.attributes.map(
              (attribute, index) => {
                return (
                  <div className="pt-2 font-bold" key={index}>
                    {attribute.key}:{" "}
                    <span className=" font-normal">{attribute.value}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalView;
