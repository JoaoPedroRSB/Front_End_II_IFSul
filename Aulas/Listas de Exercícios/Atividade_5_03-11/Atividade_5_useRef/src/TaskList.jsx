import { useTasks } from "./context/TaskContext";
import Task from "./Task";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
