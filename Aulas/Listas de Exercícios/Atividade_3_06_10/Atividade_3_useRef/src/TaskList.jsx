import Task from "./Task";

export default function TaskList({ tasks, removeTask, updateTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}
