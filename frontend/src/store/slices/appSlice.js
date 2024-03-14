import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuVisible: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuVisible = !state.isMenuVisible;
    },
  },
});

export const { toggleMenu } = appSlice.actions;

export default appSlice.reducer;

export const selectMenuVisible = (state) => state.app.isMenuVisible;
