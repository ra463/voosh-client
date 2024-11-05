import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
