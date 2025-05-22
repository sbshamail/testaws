import React, { useContext } from "react";
import Nav from "./Nav";
import Image from "next/image";
import { EditContractContext } from "../page";

const Navbar = () => {
  const { contract } = useContext(EditContractContext);
  const list = [
    { text: "Fill Contract" },
    { text: "Price Print" },
    { text: "Services Redemption" },
  ];
  const dealersettinglist = [
    {
      src: "wallet-bucks-icon.png",
      available: contract?.dealersetting.EnableWalletBucks,
    },
    {
      src: "loyalty_cash_status.png",
      available: contract?.dealersetting.EnableLoyaltyCash,
    },
    { src: "customer-call-log-button.png", available: true },
    { src: "renew-contract-button.png", available: true },
    { src: "make-vin-change-history.png", available: true },
  ];
  return (
    <div className="w-full flex flex-row items-center mb-10">
      <div className="w-1/2 flex flex-row gap-2">
        {list.map((nav, i) => (
          <Nav key={i} text={nav.text} i={i} />
        ))}
      </div>
      <div className="w-1/2 flex flex-row gap-5">
        <Image
          src="/images/carfax-icon.png"
          width={150}
          height={40}
          alt="carfax icon"
        />
        {dealersettinglist.map(
          (item, i) =>
            item.available && (
              <Image
                key={i}
                src={`/images/${item.src}`}
                width={40}
                height={40}
                alt="img"
              />
            )
        )}
      </div>
    </div>
  );
};

export default Navbar;
