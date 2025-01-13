import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchBoards = async () => {
    try {
      const querySnapshot = await getDocs(boardsColRef);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(boards);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return { createBoard, fetchBoards };
};

export default useApp;
