import React, { useState } from 'react'
import { toast } from 'react-toastify'
function Task({ task, toggleActive, deleteTask, updateTask, onlyActive }) {

    const [editable, setEditable] = useState(false)
    const [message, setMessage] = useState(task.message)

    const editTodo = () => {
        updateTask(task.id, message)
    }
    if (onlyActive && !task.active)
        return;
    return (
        <div
            className={`mb-4 flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${task.active ? "bg-[#90EE90]" : "bg-gray-200"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-crosshair"
                checked={!task.active}
                onChange={() => {toggleActive(task.id)
                }}
                disabled={editable}
            />
            {
                editable ? (<input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${editable ? "border-black/10 px-2" : "border-transparent"} ${!task.active ? "line-through" : ""}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />) :
                    (<span className={`border outline-none w-full bg-transparent rounded-lg ${editable ? "border-black/10 px-2" : "border-transparent"} ${!task.active ? "line-through" : ""}`}>{message}</span>)
            }
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (!task.active) return;
                    if (message == "" && editable) {
                        toast.error("Message cannot be empty")
                        return
                    }
                    if (editable) {
                        editTodo();
                    }
                    setEditable(prev => !prev);
                }}
                disabled={!task.active}
            >
                {!editable ? "Edit" : "Save"}
            </button>

            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTask(task.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default Task;

