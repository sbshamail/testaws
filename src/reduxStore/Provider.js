"use client"; // Required to use client-side React components

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // setIsClient(true);
  }, []);
  return (
    <Provider store={store}>
      {isClient && persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};

export default ReduxProvider;
