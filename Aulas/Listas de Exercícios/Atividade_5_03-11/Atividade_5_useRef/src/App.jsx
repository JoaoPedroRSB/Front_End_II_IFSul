import { useTasks } from "./context/TaskContext";
import TaskList from "./TaskList";

export default function App() {
  const { addTask, taskInputRef, tasks, removeTask, updateTask } = useTasks();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        📋 TodoList com useRef e Context API
      </h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          ref={taskInputRef}
          placeholder="Digite o título da tarefa..."
          className="px-4 py-2 rounded bg-gray-800 text-white w-full outline-none border border-gray-600"
        />
        <button onClick={addTask} className="add-task">
          ➕ Adicionar Tarefa
        </button>
      </div>

      <TaskList tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
    </div>
  );
}
