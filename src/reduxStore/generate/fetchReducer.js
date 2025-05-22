// import { fetchPost } from "@/utils/action/function";
// import { mypcp } from "../../../config";
// export const createFetchDataThunk = ({ name, api }) => {
//   return createAsyncThunk(`${name}/fetchData`, async (params, thunkAPI) => {
//     const currentState = thunkAPI.getState();
//     // console.log(currentState.token.data)
//     const url = `${mypcp}${api}`;
//     if (params.newData && params.newData.length !== 0) {
//       let existData = currentState[name].data;
//       return {
//         data: [...newData, ...existData],
//       };
//     }

//     const res = fetchPost({ url, formdata, token });
//     //   const response = await axios.get(
//     //     `${apidomain ? apidomain : process.env.NEXT_PUBLIC_API}/${api}?${queryString}`,
//     //     {
//     //       withCredentials: true,
//     //       headers: {
//     //         Authorization: `Bearer ${currentState.token.data}`
//     //       }
//     //     }
//     //   );
//     return response.data;
//   });
// };

// const generateSlice = ({ name, fetchData }) => {
//   // const reducers = generateReducers(customReducers);

//   const slice = createSlice({
//     name,
//     initialState: {
//       data: [],
//       isLoading: false,
//       isError: false,
//       error: null,
//     },

//     // reducers,
//     extraReducers: (builder) => {
//       builder.addCase(fetchData.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       });
//       builder.addCase(fetchData.fulfilled, (state, action) => {
//         state.data = action.payload.data;

//         state.isLoading = false;
//         state.isError = false;
//       });
//       builder.addCase(fetchData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.error = action.error;
//       });
//     },
//   });

//   return slice.reducer; //// Return only the reducer part of the slice
//   // return slice; //// Return the entire slice object, if reducers defined
// };

// // export const  {setInitialData}  = generateSlice.actions;
// export default generateSlice;
