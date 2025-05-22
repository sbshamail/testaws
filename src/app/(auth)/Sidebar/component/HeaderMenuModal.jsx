import React, { useEffect } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import HeaderMenu from "./HeaderMenu";

const HeaderMenuModal = ({ close, open, loading, setloading }) => {
  useEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      if (window.innerWidth >= 1152) {
        close(false); // Automatically close modal on lg screens
      }
    };

    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SimpleModal
      close={close}
      open={open}
      title={"Search Contract"}
      className={"max-w-2xl "}
    >
      <div className="w-full flex flex-col gap-4 items-center">
        <HeaderMenu loading={loading} setloading={setloading} close={close} />
      </div>
    </SimpleModal>
  );
};

export default HeaderMenuModal;
