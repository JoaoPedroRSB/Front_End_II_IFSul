import { useState } from "react";

export default function Task({ task, removeTask, updateTask }) {
  const [steps, setSteps] = useState(task.steps);

  const addStep = () => {
    const desc = prompt("Digite a descrição da etapa:");
    if (desc) {
      const updatedSteps = [...steps, { id: Date.now(), desc, done: false }];
      setSteps(updatedSteps);
      updateTask({ ...task, steps: updatedSteps });
    }
  };

  const toggleStep = (id) => {
    const updatedSteps = steps.map((s) =>
      s.id === id ? { ...s, done: !s.done } : s
    );
    setSteps(updatedSteps);
    updateTask({ ...task, steps: updatedSteps });
  };

  const removeStep = (id) => {
    const updatedSteps = steps.filter((s) => s.id !== id);
    setSteps(updatedSteps);
    updateTask({ ...task, steps: updatedSteps });
  };

  // ✅ Tarefa só é cumprida se todas as etapas ainda existirem e estiverem feitas
  const allDone = steps.length > 0 && steps.every((s) => s.done);

  return (
    <div className={`task ${allDone ? "done" : ""}`}>
      <div className="task-header">
        <h2 className={allDone ? "title-done" : ""}>{task.title}</h2>
        <div className="task-actions">
          {allDone && <span className="badge">✅ Tarefa Cumprida</span>}
          <button onClick={addStep} className="add-step">➕ Adicionar Etapa</button>
          <button onClick={() => removeTask(task.id)} className="delete">🗑️</button>
        </div>
      </div>

      <ul>
        {steps.map((s) => (
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
