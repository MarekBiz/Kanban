import { Stack, Typography, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ id, text, removeTask}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        p={1}
        width="100%"
        border="1px solid"
        borderColor="#777980"
        bgcolor="#45474E"
      >
        {text}
      </Typography>
      <IconButton onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default Task;
