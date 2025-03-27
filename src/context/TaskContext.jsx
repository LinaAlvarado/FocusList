import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addTask, listenToTasks, updateTask, deleteTask } from "../services/taskService";

const TasksContext = createContext();

export const TaskProvider = ({ children }) => {
   
    const { user } = useAuth(); 
    const [tasks, setTasks] = useState([]); 
  
    useEffect(() => {
      if (!user) return;
  
      const unsubscribe = listenToTasks(user.uid, setTasks);
      return () => unsubscribe(); 
    }, [user]);

    return (
        <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
          {children}
        </TasksContext.Provider>
      )
}

export const useTaskContext = () => useContext(TasksContext);