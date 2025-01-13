import { useState } from "react";
import {
  Dialog,
  Stack,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";


const CreateBoardModal = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);

  console.log({name, color})


  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Create Board" />
        <Stack my={5} spacing={3}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Board name"
          ></TextField>
          <Stack spacing={1.5} direction="row">
            <Typography>Color: </Typography>
            {colors.map((clr, idx) => (
              <Box
              sx={{
                cursor: "pointer",
                border: color === idx ? "3px solid red" : "none"
              }}

              onClick={() => setColor(idx)}
                key={clr}
                height={25}
                width={25}
                backgroundColor={clr}
                borderRadius="50%"
              />
            ))}
          </Stack>
        </Stack>
        <Button variant="contained" size="large">
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
