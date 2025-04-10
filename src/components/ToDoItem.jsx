import React, { useState } from "react";

export default function ToDoItem({ toDo, onDelete, onCheck, onEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState(toDo.task);

  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    const editedToDo = draft.trim();
    if (editedToDo === "") {
      Swal.fire("Failed", "To Do cannot be empty", "error");
      return;
    }

    onEdit(toDo.id, editedToDo);
    Swal.fire("Success", "To Do updated successfully", "success");
    setIsEdit(false);
  };

  const handleCancel = () => {
    setDraft(toDo.task);
    setIsEdit(false);
  };

  return (
    <div className="flex max-sm:flex-col max-sm:justify-center sm:items-center gap-4 max-sm:gap-2 my-4 max-sm:my-6">
      <div className="flex-1 flex items-center gap-4 max-sm:gap-2">
        <label className="relative inline-block w-5 h-5">
          <input
            type="checkbox"
            checked={toDo.checked}
            onChange={() => onCheck(toDo.id)}
            className="w-full h-full appearance-none bg-gray-200 checked:bg-orange-400 border border-gray-400 rounded cursor-pointer transition duration-200 hover:scale-105 hover:shadow-md"
          />
          {toDo.checked && (
            <svg
              className="absolute top-0 left-0 w-full h-full p-1 text-white pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </label>

        {isEdit ? (
          <div class="w-full h-8 relative flex rounded-md">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="peer w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-black focus:shadow-md"
            />
          </div>
        ) : (
          <span className={`flex-1 ${toDo.checked ? "line-through" : ""}`}>
            {toDo.task}
          </span>
        )}
      </div>

      {isEdit ? (
        <div className="flex gap-2 max-sm:ml-8">
          <button
            onClick={handleEdit}
            className="bg-green-400 text-black px-4 py-1 max-sm:text-xs rounded-md shadow-md cursor-pointer hover:bg-green-500 transition duration-200 ease-in-out"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-1 max-sm:text-xs rounded-md shadow-md cursor-pointer hover:bg-gray-500 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2 max-sm:ml-8">
          <button
            onClick={handleEdit}
            className="bg-yellow-400 px-4 py-1 max-sm:text-xs rounded-md shadow-md cursor-pointer hover:bg-yellow-500 transition duration-200 ease-in-out"
          >
            Edit
          </button>

          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  onDelete(toDo.id);
                  Swal.fire(
                    "Success",
                    "To Do deleted successfully!",
                    "success"
                  );
                }
              });
            }}
            className="bg-red-500 px-4 py-1 max-sm:text-xs text-white rounded-md shadow-md cursor-pointer hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
