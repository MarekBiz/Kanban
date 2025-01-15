import { useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({boardData}) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData))

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
        />
      )}
      <Grid container px={4} mt={2} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            name={statusMap[status]}
            addTask={() => setAddTaskTo(status)}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;
