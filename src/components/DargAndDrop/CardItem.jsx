import React, { useState } from "react";
import moment from "moment";
import UpdateTask from "../layout/UpdateTask";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosUtils";
import ViewTask from "../layout/ViewTask";
import { useSelector } from "react-redux";

export const CardItem = ({ data, handleDragging }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this task?")) return;
      setLoading(true);

      const { data } = await axiosInstance.delete(
        `/api/task/delete-task/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="card-container"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h3>Title: {data.title}</h3>
      <div className="details">
        <p>
          Description:{" "}
          {data.description.length > 50
            ? data.description.slice(0, 50).concat("...")
            : data.description}
        </p>
        <span>Status: {data.status.toUpperCase()}</span>
        <span>Created At: {moment(data.createdAt).format("lll")}</span>
      </div>

      <div className="btns">
        <button onClick={() => handleDelete(data._id)}>
          {loading ? <PulseLoader color="white" /> : "Delete"}
        </button>
        <button onClick={() => setShowUpdateTask(true)}>Edit</button>
        <button onClick={() => setShowTask(true)}>View Details</button>
      </div>

      {showUpdateTask && (
        <UpdateTask setShowUpdateTask={setShowUpdateTask} Carddata={data} />
      )}
      {showTask && <ViewTask setShowTask={setShowTask} Carddata={data} />}
    </div>
  );
};
