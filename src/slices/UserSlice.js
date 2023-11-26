import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isClicked: false,
    userData: {},
  },
  reducers: {
    viewProfileModal: (state, action) => {
      state.isClicked = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { viewProfileModal, setUserData } = userSlice.actions;
