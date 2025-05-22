// const ShadowContainer = ({ children, bg }) => {
//   return (
//     <div
//       className={`${
//         bg ? bg : "bg-white"
//       } rounded-lg p-5 drop-shadow-md w-full h-full`}
//     >
//       {children}
//     </div>
//   );
// };

import { twMerge } from "tailwind-merge";

// export default ShadowContainer;

const ShadowContainer = ({ children, bg, cursor, className }) => {
  return (
    <div
      className={twMerge(
        `rounded-3xl  bg-card text-card-foreground ${bg} px-5 py-5 h-full w-full ${cursor} `,
        `${className}`
      )}
      style={{
        boxShadow:
          bg == "transparent" ? "" : "0px 4px 15px 0px rgba(0, 55, 76, 0.05)",
      }}
    >
      {children}
    </div>
  );
};

export default ShadowContainer;
