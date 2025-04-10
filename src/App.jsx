import React, { useState, useEffect } from "react";
import ToDoItem from "./components/ToDoItem";

export default function App() {
  const [toDos, setToDos] = useState(() => {
    try {
      const stored = localStorage.getItem("toDos");
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      Swal.fire("Failed", "Failed to load from localStorage", "error");
      localStorage.removeItem("toDos");
    }
    return [];
  });

  const [newToDo, setNewToDo] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const addToDo = () => {
    const newItem = newToDo.trim();
    if (!newItem) return Swal.fire("Failed", "To Do cannot be empty", "error");

    setToDos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), task: newItem, checked: false },
    ]);

    setNewToDo("");
    Swal.fire("Success", "To Do added successfully", "success");
  };

  const editToDo = (id, draft) => {
    setToDos(
      toDos.map((toDo) => (toDo.id === id ? { ...toDo, task: draft } : toDo))
    );
  };

  const deleteToDo = (id) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  const checkToDo = (id) => {
    setToDos(
      toDos.map((toDo) =>
        toDo.id === id ? { ...toDo, checked: !toDo.checked } : toDo
      )
    );
  };

  const data = toDos.filter((toDo) => {
    if (status === "checked") return toDo.checked;
    if (status === "unchecked") return !toDo.checked;
    return true;
  });

  return (
    <section className="bg-neutral-100 min-h-screen flex flex-col items-center py-16">
      <h1 className="text-2xl font-bold mb-4">To Do List</h1>
      <div className="w-9/12 max-sm:w-[90%] max-sm:text-sm mx-auto p-4 shadow-lg rounded-md bg-white flex gap-4 max-sm:gap-2 mb-8">
        <div class="w-full h-10 relative flex rounded-md">
          <input
            type="text"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
            className="peer w-full bg-transparent outline-none px-4 text-base max-sm:text-sm rounded-md bg-white border border-black focus:shadow-md"
            id="search"
            required
          />

          <label
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-2 text-base max-sm:text-sm font-light text-gray-500 duration-200 ease-in-out peer-focus:top-0 peer-focus:text-sm peer-focus:text-purple-600 peer-focus:left-3 peer-valid:top-0 peer-valid:text-sm peer-valid:text-purple-600 peer-valid:left-3"
            htmlFor="search"
          >
            Input new to do list...
          </label>
        </div>

        <button
          onClick={addToDo}
          className="bg-sky-300 text-black px-4 py-1 rounded-md shadow-md hover:bg-sky-400 transition duration-200 ease-in-out cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="w-9/12 max-sm:w-[90%] max-sm:text-sm mx-auto p-4 shadow-lg rounded-md bg-white">
        <div className="flex gap-4 max-sm:gap-2 mb-4">
          <button
            onClick={() => setStatus("all")}
            className={`px-4 py-1 rounded-md cursor-pointer ${
              status === "all" ? "bg-purple-300" : "bg-neutral-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("unchecked")}
            className={`px-4 py-1 rounded-md cursor-pointer ${
              status === "unchecked" ? "bg-green-300" : "bg-neutral-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatus("checked")}
            className={`px-4 py-1 rounded-md cursor-pointer ${
              status === "checked" ? "bg-orange-300" : "bg-neutral-200"
            }`}
          >
            Completed
          </button>
        </div>
        <div>
          {data.map((toDo) => (
            <ToDoItem
              key={toDo.id}
              toDo={toDo}
              onDelete={deleteToDo}
              onCheck={checkToDo}
              onEdit={editToDo}
            />
          ))}
          {data.length === 0 && (
            <p className="text-gray-500">There are no items on the list!</p>
          )}
        </div>
      </div>
    </section>
  );
}
