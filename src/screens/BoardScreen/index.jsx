import { useMemo } from "react";
import useStore from "../../store";
import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import { useParams } from "react-router-dom";


const BoardScreen = () => {
  const { boards } = useStore();
  const { boardId } = useParams();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);
  console.log(board);
  return (
    <>
      <BoardTopbar {...board} />
      <BoardInterface />
    </>
  );
};

export default BoardScreen;
