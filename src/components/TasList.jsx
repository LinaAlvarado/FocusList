import { useTaskContext } from "../context/TaskContext"; 

const TaskList = () => {
  const { tasks } = useTaskContext(); 

  return (
    <div>
      <h2>Mis Tareas</h2>
      {tasks.length === 0 ? (
        <p>No tienes tareas aún.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
