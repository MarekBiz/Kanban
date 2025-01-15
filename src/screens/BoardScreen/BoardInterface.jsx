import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../hooks/useApp";
import useStore from "../../store";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );

  // const handleRemoveTask = useCallback(async (tab, taskId) => {
  //   const dClone = structuredClone(tabs);
  //   const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
  //   dClone[tab].splice(taskIdx, 1);
  //   try {
  //     await updateBoardData(boardId, dClone);
  //     setTabs(dClone);
  //     updateLastUpdated();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const handleRemoveTask = useCallback(async (tab, taskId) => {
    setTabs((prevTabs) => {
      const dClone = structuredClone(prevTabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      if (taskIdx !== -1) {
        dClone[tab].splice(taskIdx, 1);
      }
      return dClone;
    });
  
    try {
      const updatedTabs = structuredClone(tabs);
      const taskIdx = updatedTabs[tab].findIndex((t) => t.id === taskId);
      if (taskIdx !== -1) {
        updatedTabs[tab].splice(taskIdx, 1);
      }
      await updateBoardData(boardId, updatedTabs);
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    }
  }, [boardId, tabs, updateBoardData, updateLastUpdated]);
  

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr("Task cannot be empty :(");
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    try {
      setLoading(true);
      await updateBoardData(boardId, dClone);
      setTabs(dClone);
      setAddTaskTo("");
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //console.log({boardData})

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <Grid container px={4} mt={2} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            status={status}
            tasks={tabs[status]}
            name={statusMap[status]}
            openAddTaskModal={handleOpenAddTaskModal}
            removeTask={handleRemoveTask}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;
