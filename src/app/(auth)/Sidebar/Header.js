"use client";
import React, { useState } from "react";

import { MdMenu } from "react-icons/md";
import HeaderMenu from "./component/HeaderMenu";
import HeaderMenuModal from "./component/HeaderMenuModal";

const Header = ({ loading, setloading }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="w-full   xlg:pl-6 xl:pl-10 xlg:px-4 px-2">
      <div className="  py-5">
        {/* For xlg screen */}
        <>
          <div className="w-full flex justify-end xlg:hidden">
            <MdMenu
              className="text-2xl cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          </div>
          <div className={""}>
            {toggleMenu && (
              <div>
                <HeaderMenuModal
                  open={toggleMenu}
                  close={() => setToggleMenu(false)}
                  loading={loading}
                  setloading={setloading}
                />
              </div>
            )}
          </div>
        </>
        {/* For upper xlg screen */}
        <div className=" w-full xlg:flex hidden items-center  flex-wrap xlg:flex-nowrap gap-2">
          <HeaderMenu loading={loading} setloading={setloading} />
        </div>
      </div>
    </div>
  );
};

export default Header;
