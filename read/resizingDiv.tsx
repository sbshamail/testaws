// // @ts-nocheck
// import React, { useEffect, useState, useRef } from "react";

// function ResponsiveGrid() {
//   const [gridClass, setGridClass] = useState("grid-cols-1");
//   const gridContainerRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== undefined) {
//       const handleResize = () => {
//         const containerWidth = gridContainerRef.current.offsetWidth;

//         if (containerWidth >= 1024) {
//           setGridClass("grid-cols-4");
//         } else if (containerWidth >= 640) {
//           setGridClass("grid-cols-2");
//         } else {
//           setGridClass("grid-cols-1");
//         }
//       };

//       // Attach resize event listener to window
//       window.addEventListener("resize", handleResize);

//       // Initial check
//       handleResize();

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={gridContainerRef}
//       className={`w-full sm:w-[600px] grid ${gridClass} gap-4`}
//     >
//       <div>Item 1</div>
//       <div>Item 2</div>
//       <div>Item 3</div>
//       <div>Item 4</div>
//       {/* Add more items as needed */}
//     </div>
//   );
// }

// export default ResponsiveGrid;

// // ############################################################################3
// // Method 2
// import React, { useEffect, useState, useRef } from "react";

// function ResponsiveGrid() {
//   const [gridClass, setGridClass] = useState("grid-cols-1");
//   const gridContainerRef = useRef(null);

//   useEffect(() => {
//     const handleResize = (entries) => {
//       for (let entry of entries) {
//         const containerWidth = entry.contentRect.width;

//         if (containerWidth >= 1024) {
//           setGridClass("grid-cols-4");
//         } else if (containerWidth >= 640) {
//           setGridClass("grid-cols-2");
//         } else {
//           setGridClass("grid-cols-1");
//         }
//       }
//     };

//     const resizeObserver = new ResizeObserver(handleResize);
//     resizeObserver.observe(gridContainerRef.current);

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, []);

//   return (
//     <div
//       ref={gridContainerRef}
//       className={`w-full sm:w-[600px] grid ${gridClass} gap-4`}
//     >
//       <div>Item 1</div>
//       <div>Item 2</div>
//       <div>Item 3</div>
//       <div>Item 4</div>
//       {/* Add more items as needed */}
//     </div>
//   );
// }

// export default ResponsiveGrid;

// // ############################################################################3
// // Method 3
// // npm install @react-hook/resize-observer
// import React, { useState, useRef } from "react";
// import useResizeObserver from "@react-hook/resize-observer";

// function ResponsiveGrid() {
//   const [gridClass, setGridClass] = useState("grid-cols-1");
//   const gridContainerRef = useRef(null);

//   // Custom hook to handle resize
//   useResizeObserver(gridContainerRef, (entry) => {
//     const containerWidth = entry.contentRect.width;

//     if (containerWidth >= 1024) {
//       setGridClass("grid-cols-4");
//     } else if (containerWidth >= 640) {
//       setGridClass("grid-cols-2");
//     } else {
//       setGridClass("grid-cols-1");
//     }
//   });

//   return (
//     <Layout>
//       <div>
//         <Navbar />
//         <div
//           ref={gridContainerRef}
//           className={`w-[700px] grid ${gridClass} gap-4`}
//         >
//           <div>Item 1</div>
//           <div>Item 2</div>
//           <div>Item 3</div>
//           <div>Item 4</div>
//           {/* Add more items as needed */}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default ResponsiveGrid;

// // ############################################################################3
// // Method 4

// //file1.ts hook
// // useElementSize.ts
// import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
// import useResizeObserver from "@react-hook/resize-observer";

// interface Size {
//   width: number;
//   height: number;
// }

// export default function useElementSize<
//   T extends HTMLElement = HTMLDivElement
// >(): [MutableRefObject<T | null>, Size] {
//   const target = useRef<T | null>(null);
//   const [size, setSize] = useState<Size>({ width: 0, height: 0 });

//   const setRoundedSize = ({ width, height }: Size) => {
//     setSize({ width: Math.round(width), height: Math.round(height) });
//   };

//   useLayoutEffect(() => {
//     if (target.current) {
//       setRoundedSize(target.current.getBoundingClientRect());
//     }
//   }, [target]);

//   useResizeObserver(target, (entry) => {
//     if (entry.contentBoxSize) {
//       const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
//       setRoundedSize({ width, height });
//     } else {
//       // Fallback for browsers that don't support contentBoxSize
//       const { width, height } = entry.contentRect;
//       setRoundedSize({ width, height });
//     }
//   });

//   return [target, size];
// }
// //file1.tsx
// import React, { useEffect, useState } from "react";
// import useElementSize from "./useElementSize";

// function ResponsiveGrid() {
//   const [gridClass, setGridClass] = useState("grid-cols-1");
//   const [gridContainerRef, { width }] = useElementSize<HTMLDivElement>();

//   useEffect(() => {
//     if (width >= 1024) {
//       setGridClass("grid-cols-4");
//     } else if (width >= 640) {
//       setGridClass("grid-cols-2");
//     } else {
//       setGridClass("grid-cols-1");
//     }
//   }, [width]);

//   return (
//     <Layout>
//       <div>
//         <Navbar />
//         <div
//           ref={gridContainerRef}
//           className={`max-w-full w-full grid ${gridClass} gap-4 bg-gray-100`}
//         >
//           <div>Item 1</div>
//           <div>Item 2</div>
//           <div>Item 3</div>
//           <div>Item 4</div>
//           {/* Add more items as needed */}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default ResponsiveGrid;
