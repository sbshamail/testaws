import Image from "next/image";
import { FaPassport } from "react-icons/fa";
import { Home, ShoppingCart, User } from "lucide-react";

const Reward = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 50 50"
    className="w-6 h-6"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <path
        stroke="#344054"
        d="m29.27 35.625l4.063 8.125l4.125-4.23l6.292.063l-5.854-11.625v-.02M20.73 35.625l-4.063 8.125l-4.125-4.23l-6.292.063l5.854-11.625v-.02"
      ></path>
      <path
        stroke="#f4f7ff"
        d="M40.167 20.833c0 1.584-1.396 2.917-1.855 4.334c-.458 1.416-.145 3.354-1.041 4.583s-2.813 1.5-3.938 2.417s-2.083 2.625-3.541 3.104c-1.459.479-3.105-.438-4.688-.438s-3.27.896-4.687.438c-1.417-.459-2.313-2.23-3.542-3.104c-1.23-.875-3.146-1.188-4.042-2.417c-.896-1.23-.562-3.125-1.041-4.583c-.48-1.459-1.959-2.75-1.959-4.334s1.396-2.916 1.854-4.333s.146-3.354 1.042-4.583s2.813-1.5 4.042-2.417s1.979-2.625 3.541-3.104c1.563-.48 3.105.437 4.688.437s3.27-.896 4.688-.437C31.104 6.854 32 8.625 33.333 9.5s3.146 1.187 4.042 2.417s.563 3.125 1.042 4.583s1.75 2.75 1.75 4.333M25 14.583a6.25 6.25 0 1 0 0 12.501a6.25 6.25 0 0 0 0-12.5"
      ></path>
    </g>
  </svg>
);

export const sidebarContents = ({ handleEFORM, handleXpModel, xp_enable }) =>
  [
    {
      id: 1,
      title: "HOME",
      icon: Home,
      link: "/customer",
      // children: [
      //   {
      //     title: "Overview",
      //     icon: MdCircle,
      //     link: "/",
      //   },
      //   {
      //     title: "Analytics",
      //     icon: MdOutlineCircle,
      //     link: "/analytics",
      //   },
      //   {
      //     title: "Reports",
      //     icon: MdOutlineCircle,
      //     children: [
      //       {
      //         title: "Monthly",
      //         icon: MdCircle,
      //         link: "/reports/monthly",
      //       },
      //       {
      //         title: "Annual",
      //         icon: MdCircle,
      //         link: "/reports/annual",
      //       },
      //     ],
      //   },
      // ],
    },
    {
      id: 2,
      title: "USER PROFILE",
      icon: User,
      link: "/userProfile",
    },
    {
      id: 3,
      title: "ORDER LIST",
      icon: ShoppingCart,
      link: "/customer/orderlist",
    },
    xp_enable && {
      id: 4,
      title: "XP REWARDS",
      icon: () => Reward,
      action: handleXpModel,
    },
    {
      id: 5,
      title: "GLOVIE LIST",
      icon: () => (
        <Image
          src="/images/glovie_dashboard-new.png"
          width={20}
          height={20}
          alt="glovie"
          className="bg-foreground cursor-pointer dark:bg-black"
        />
      ),
      link: "/customer/glovie",
    },
    {
      id: 6,
      title: "EFORM",
      icon: FaPassport,
      action: handleEFORM,
    },
  ].filter(Boolean);
