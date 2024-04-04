import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("getData", async () => {
  const data = await fetch("http://localhost:3200/practice");
  return await data.json();
});

export const dataSlice = createSlice({
  name: "getData",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;
