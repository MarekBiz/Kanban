import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
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

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (err) {
      console.log(err);
    }
  };

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
        createdAt: new Date().toLocaleString("pl-PL"),
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
        createdAt: doc.data().createdAt.toDate().toLocaleString("pl-PL"),
      }));

      setBoards(boards);
    } catch (err) {
      console.log(err);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData };
};

export default useApp;
