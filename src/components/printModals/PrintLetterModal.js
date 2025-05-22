import React from "react";

import PdfScreenshotScreen from "../cui/PdfScreenShot";

const PrintLetterModal = ({ setmodal, modal, value, setValue, close }) => {
  const printContent = () => (
    <div id="print-letter-modal" className="my-4">
      <div
        className=" rounded-md"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
  return (
    <PdfScreenshotScreen
      open={modal}
      setOpen={setmodal}
      Component={printContent}
      close={close}
    />
  );
};

export default PrintLetterModal;
