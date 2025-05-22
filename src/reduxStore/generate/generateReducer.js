import { ls } from "@/utils/localstorage";
import { createSlice } from "@reduxjs/toolkit";

const handleGetCookie = (name) => {
  const data = ls.get(name);
  return data && data;
};
export const generateReducer = (name, cache) => {
  const initialState = { data: handleGetCookie(name) };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setData: (state, action) => {
        if (action.payload == {}) {
          state.data = {}; // clear data if empty object
          if (cache) {
            ls.set(name, {});
          }
          return;
        }
        const [key] = Object.keys(action.payload);
        const value = action.payload[key];
        state.data = { ...state.data, ...action.payload };
        // state.data = { ...state.data, [key]: value };
        if (cache) {
          ls.set(name, state.data);
          // ls.set(name, { ...state.data, [key]: value });
        }
      },
    },
  });

  // Return both the reducer and the actions
  return { reducer: slice.reducer, actions: slice.actions };
};

export const setReducer = (name) => {
  const reducer = generateReducer(name);
  const { setData } = reducer.actions;

  return setData;
};
