import React, { useState } from "react";
import { NewTaskProps, TaskProps } from "../types/type";

export default function NewTask({ onAdd }: NewTaskProps) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-red-500"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
