import { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";
import Topbar from "./Topbar";

const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default BoardsScreen;
