import { db } from "../../firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";


export const addTask = async (task, userId) => {
  if (!userId) throw new Error("Usuario no autenticado");

  return await addDoc(collection(db, "tasks"), {
    ...task,
    userId, 
    createdAt: serverTimestamp(),
  });
};

export const listenToTasks = (userId, callback) => {
  if (!userId) return;

  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
};

export const updateTask = async (taskId, updatedData) => {
  const taskRef = doc(db, "tasks", taskId);
  return await updateDoc(taskRef, updatedData);
};

export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  return await deleteDoc(taskRef);
};
