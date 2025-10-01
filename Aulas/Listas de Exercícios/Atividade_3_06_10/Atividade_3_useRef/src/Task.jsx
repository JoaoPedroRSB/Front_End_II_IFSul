import { useRef } from "react";

export default function Task({ task, removeTask, updateTask }) {
  const stepInputRef = useRef();

  const addStep = () => {
    const desc = stepInputRef.current.value.trim();
    if (desc) {
      const updatedSteps = [...task.steps, { id: Date.now(), desc, done: false }];
      updateTask({ ...task, steps: updatedSteps });
      stepInputRef.current.value = ""; // limpa input
    }
  };

  const toggleStep = (id) => {
    const updatedSteps = task.steps.map((s) =>
      s.id === id ? { ...s, done: !s.done } : s
    );
    updateTask({ ...task, steps: updatedSteps });
  };

  const removeStep = (id) => {
    const updatedSteps = task.steps.filter((s) => s.id !== id);
    updateTask({ ...task, steps: updatedSteps });
  };

  const allDone = task.steps.length > 0 && task.steps.every((s) => s.done);

  return (
    <div className={`task ${allDone ? "done" : ""}`}>
      <div className="task-header">
        <h2 className={allDone ? "title-done" : ""}>{task.title}</h2>
        <div className="task-actions">
          {allDone && <span className="badge">✅ Tarefa Cumprida</span>}
          <button onClick={() => removeTask(task.id)} className="delete">🗑️</button>
        </div>
      </div>

      {/* Campo para adicionar etapas */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          ref={stepInputRef}
          placeholder="Digite uma etapa..."
          className="px-3 py-1 rounded bg-gray-800 text-white w-full outline-none border border-gray-600"
        />
        <button onClick={addStep} className="add-step">➕ Adicionar Etapa</button>
      </div>

      <ul>
        {task.steps.map((s) => (
          <li key={s.id}>
            <span
              onClick={() => toggleStep(s.id)}
              className={s.done ? "done" : ""}
            >
              {s.desc}
            </span>
            <button onClick={() => removeStep(s.id)} className="delete">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
