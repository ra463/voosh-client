import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setTasks } from "./taskSlice";

export const getAllTasks = async (
  dispatch,
  setLoading,
  search,
  sort,
  token
) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/task/get-all-task?title=${search}&sort=${sort}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(setTasks({ tasks: data.tasks }));
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};
