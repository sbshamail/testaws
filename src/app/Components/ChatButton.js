import React, { useEffect } from "react";

const ChatButton = () => {
  useEffect(() => {
    const loadTawkScript = () => {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();

      (function () {
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/64778b3f74285f0ec46ec979/1i35ib3nt";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    };

    const removeTawkScript = () => {
      const tawkScript = document.querySelector(
        'script[src^="https://embed.tawk.to"]'
      );
      if (tawkScript) {
        tawkScript.remove();
      }
    };

    loadTawkScript();

    return () => {
      removeTawkScript();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleClick = () => {
    if (typeof Tawk_API !== "undefined") {
      Tawk_API.toggle();
    }
  };

  return (
    <div className="px-4 mx-4 h-28 bg-white flex p-4 justify-center rounded-[20px] shadow-lg">
      <button
        className="m-4 bg-textColor text-avenir text-white w-full rounded-[12px]"
        onClick={handleClick}
      >
        Live Chat Support
      </button>
      {/* Additional functionality can be uncommented as needed */}
      {/* <button onClick={handleMinimize}> Minimize the Chat </button> */}
      {/* 
      <TawkMessengerReact
        propertyId="64778b3f74285f0ec46ec979/1i35ib3nt"
        widgetId="default"
        useRef={tawkMessengerRef}
        onLoad={onLoad}
      /> 
      */}
    </div>
  );
};

export default ChatButton;
