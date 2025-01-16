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
  const { setBoards, addBoard, setToastr } = useStore();

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (err) {
      setToastr("Eroor updating board");
      throw err;
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
      setToastr("Eroor fetching board");
      throw err;
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
      setToastr("Eroor creating board");
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
      setToastr("Eroor featching boards");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData };
};

export default useApp;
