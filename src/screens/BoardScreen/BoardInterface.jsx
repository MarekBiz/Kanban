import { useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../hooks/useApp";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({boardData, boardId}) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData))
  const {updateBoardData} = useApp()


  const handleAddTask = async (text) => {
    const dClone = structuredClone(tabs)
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() })
    try {
      await updateBoardData(boardId, dClone);
      setTabs(dClone)
      setAddTaskTo('')
    } catch (err) {
      console.log(err)
    }
  }

  //console.log({boardData})

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
        />
      )}
      <Grid container px={4} mt={2} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            tasks={tabs[status]}
            name={statusMap[status]}
            addTask={() => setAddTaskTo(status)}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;
