import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosUtils";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-hot-toast";
import "./Task.scss";

const UpdateTask = ({ setShowUpdateTask, Carddata }) => {
  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState(Carddata.title);
  const [description, setDescription] = useState(Carddata.description);
  const [status, setStatus] = useState(Carddata.status);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axiosInstance.patch(
        `/api/task/update-task/${Carddata._id}`,
        {
          title,
          description,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setShowUpdateTask(false);
        setStatus("");
        setTitle("");
        setDescription("");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add_task">
      <div className="new_task">
        <div className="task_head">
          <h2>Edit Your Task</h2>
          <span onClick={() => setShowUpdateTask(false)}>
            <MdOutlineClose />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title of the Task"
          />
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
          />

          <div className="btn">
            <button onClick={() => setShowUpdateTask(false)}>Cancel</button>
            <button disabled={loading} type="submit">
              {loading ? <PulseLoader color="white" size={6} /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
