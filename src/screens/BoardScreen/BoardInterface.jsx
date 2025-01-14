import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";

const BoardInterface = () => {
  return (
    <>
      <AddTaskModal />
      <Grid container px={4} mt={2} spacing={2}>
        <BoardTab />
      </Grid>
    </>
  );
};

export default BoardInterface;
