import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`);
  const { setBoards, addBoard } = useStore();

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });

      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));

      setBoards(boards);
    } catch (err) {
      console.log(err);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoards };
};

export default useApp;
