import { createSlice } from "@reduxjs/toolkit";

export type GenaralState = {
  isLoading: boolean;
};

const initialState: GenaralState = {
  isLoading: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    setIsLoading(state: GenaralState, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = generalSlice.actions;

export default generalSlice;
