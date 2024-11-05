import React, { useState } from "react";
import Header from "../components/Header/Header";
import "../components/styles/Home.scss";
import { DragAndDrop } from "../components/DargAndDrop/DragAndDrop";
import { useSelector } from "react-redux";
import AddTask from "../components/layout/AddTask";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { token } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [showTask, setShowTask] = useState(false);

  return token ? (
    <>
      <Header />
      <div className="home">
        <div className="head">
          <button onClick={() => setShowTask(true)}>Add New Task</button>
          <div className="filters">
            <div className="search">
              <span>Search:</span>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search By Title..."
              />
            </div>
            <div className="sort">
              <span>Sort By:</span>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <DragAndDrop search={search} sort={sort} />
        {showTask && <AddTask setShowAddTask={setShowTask} />}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
