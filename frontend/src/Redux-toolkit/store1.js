import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

export const store1 = configureStore({
  reducer: {
    getData: dataReducer,
  },
});
