import { useDispatch, useSelector } from "react-redux";
import { useDragAndDrop } from "../../utils/hooks";
import { ContainerCards } from "./ContainerCards";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../features/apiCall";
import PulseLoader from "react-spinners/PulseLoader";

const typesHero = ["todo", "inprogress", "done"];

export const DragAndDrop = ({ search, sort }) => {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop(tasks);

  useEffect(() => {
    getAllTasks(dispatch, setLoading, search, sort, token);
  }, [search, sort, token, dispatch]);

  return (
    <div className="grid">
      {loading ? (
        <div className="load">
          <PulseLoader size={15} color="#36d7b7" />
        </div>
      ) : (
        typesHero.map((container) => (
          <ContainerCards
            items={listItems}
            status={container}
            key={container}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
          />
        ))
      )}
    </div>
  );
};
