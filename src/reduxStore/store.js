import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { generateReducer } from "./generate/generateReducer";
import { persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "persist",
//   storage,
//   whitelist: [],
// };
const user = {
  usertitles: generateReducer("usertitles").reducer,
  userstatus: generateReducer("userstatus").reducer,
  primaryaccount: generateReducer("primaryaccount").reducer,
  userRoles: generateReducer("userRoles").reducer,
  users: generateReducer("users", true).reducer,
};
const reducers = {
  ...user,
  contract: generateReducer("contract", true).reducer,
  importList: generateReducer("importList").reducer,
  dashboard: generateReducer("dashboard", true).reducer,
  fibreakdown: generateReducer("fibreakdown", true).reducer,
  listbatch: generateReducer("listbatch").reducer,
  GenerateListOfContractsBatch: generateReducer("GenerateListOfContractsBatch")
    .reducer,
  cancellation: generateReducer("cancellation").reducer,
  campaign: generateReducer("campaign").reducer,
  customer: generateReducer("customer").reducer,
};
const rootReducer = combineReducers(reducers);

// ✅ Always define persistedReducer to avoid SSR/CSR mismatch
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid warnings from redux-persist
    }),
});
const persistor = typeof window !== "undefined" ? persistStore(store) : null;
export { store, persistor };
