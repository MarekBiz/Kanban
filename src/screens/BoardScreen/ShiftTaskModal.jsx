import { useState } from "react";
import { Dialog, Button, Typography, Stack, Chip } from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { statusMap } from "./BoardInterface";


const ShiftTaskModal = ({ onClose, task }) => {
    
  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift task" onClose={onClose} />
        <Stack my={3} spacing={1}>
          <Stack mb={3} spacing={1}>
            <Typography>Task:</Typography>
            <Typography p={1} bgcolor="#45474E">
              {task.text}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography>Status</Typography>
            <Stack direction="row" spacing={1}>
              {Object.entries(statusMap).map(([status, label]) => (
                <Chip
                  variant={task.status === status ? "filled" : "outlined"}
                  key={status}
                  label={label}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button variant="contained">Shift Task</Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;
