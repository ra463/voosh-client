import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { useSelector } from "react-redux";

export const useDragAndDrop = (initialState) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // convert the _id field to id in this data array
    const dataD = initialState.map((item, index) => {
      return {
        ...item, // Spread existing properties
        id: index + 1, // Add a sequential id field starting from 1
      };
    });

    setListItems(dataD);
  }, [initialState]);

  const handleUpdateList = async (id, status) => {
    let card = listItems.find((item) => item.id === id);

    if (card && card.status !== status) {
      card.status = status;
      if (Array.isArray(listItems)) {
        setListItems((prev) => [
          card,
          ...prev.filter((item) => item.id !== id),
        ]);
      }
    }

    try {
      const { data } = await axiosInstance.patch(
        `/api/task/update-task/${card._id}`,
        {
          title: "",
          description: "",
          status,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDragging = (dragging) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
