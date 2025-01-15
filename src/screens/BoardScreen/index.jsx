import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "../../store";
import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import { useNavigate, useParams } from "react-router-dom";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

  const handleUpdateLastUpdated = useCallback(() => setLastUpdated(new Date().toLocaleString("pl-PL")), [])

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

  return (
    <>
      <BoardTopbar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
      />
      <BoardInterface boardData={boardData} boardId={boardId} updateLastUpdated={handleUpdateLastUpdated} />
    </>
  );
};

export default BoardScreen;
