import {
  Dialog,
  Typography,
  Stack,
  IconButton,
  Chip,
  OutlinedInput,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddTaskModal = ({tabName, onClose}) => {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <Stack
          mb={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Add Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Status:</Typography>
            <Chip size="small" label={tabName}></Chip>
          </Stack>
          <OutlinedInput placeholder="Task" />
          <Button variant="contained">Add Task</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
