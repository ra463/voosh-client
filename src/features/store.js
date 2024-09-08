import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
});
