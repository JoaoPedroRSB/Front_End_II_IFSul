import { createContext, useState, useEffect, useRef, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const taskInputRef = useRef();

  // carregar tarefas
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // salvar tarefas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const title = taskInputRef.current.value.trim();
    if (title) {
      setTasks([...tasks, { id: Date.now(), title, steps: [] }]);
      taskInputRef.current.value = "";
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask, taskInputRef }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
