import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const email = localStorage.getItem("email");
const name = localStorage.getItem("name");
const avatar = localStorage.getItem("avatar");
const id = localStorage.getItem("id");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    name: name,
    email: email,
    avatar: avatar,
    id: id,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.id = action.payload.id;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.avatar = null;
      state.id = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
