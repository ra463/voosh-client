import React from "react";
import { MdOutlineClose } from "react-icons/md";
import moment from "moment";

const ViewTask = ({ setShowTask, Carddata }) => {
  return (
    <div className="add_task">
      <div className="new_task">
        <div className="task_head">
          <h2>Task Details</h2>
          <span onClick={() => setShowTask(false)}>
            <MdOutlineClose />
          </span>
        </div>
        <div className="details">
          <h3>Title: {Carddata.title}</h3>
          <div className="view">
            <p>Description: {Carddata.description}</p>
            <p>Status: {Carddata.status.toUpperCase()}</p>
            <p style={{ fontSize: "14px" }}>
              Created At: {moment(Carddata.createdAt).format("lll")}
            </p>
          </div>
          <div className="btn">
            <button
              onClick={() => {
                setShowTask(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
