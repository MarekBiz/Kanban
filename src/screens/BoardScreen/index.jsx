import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "../../store";
import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import { useNavigate, useParams } from "react-router-dom";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard, deleteBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);

  const boardData = useMemo(() => data, [data]);

  const handleDeleteBoard = useCallback (async () => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const handleUpdateLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("pl-PL")),
    []
  );

  //console.log({ data, lastUpdated, loading });

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("pl-PL"));
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate("/boards");
    else handleFetchBoard();
  }, []);

  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;

  return (
    <>
      <BoardTopbar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdated}
      />
    </>
  );
};

export default BoardScreen;
