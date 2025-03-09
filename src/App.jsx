import { act, useEffect, useState } from 'react'
import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import Task from './components/Task';

function App() {
  const [tasks, setTasks] = useState([
    /* {
      id: 1,
      message: "first",
      active:true
    } */
  ]);
  const [task, setTask] = useState("")

  const [onlyActive, setOnlyActive] = useState(false)

  const add = (e) => {
    e.preventDefault()
    if (task == "" || !task) {
      toast.error("Task cannot be empty")
      return
    }
    addTask()
    toast.success(`Added task ${task}`)
    setTask("")
  }
  const updateTask = (id, msg) => {
    setTasks(prev => prev.map(data => data.id == id ? { message: msg, active: data.active, id: data.id } : data))
  }
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }
  const addTask = () => {
    setTasks(prev => [...prev, { id: Date.now(), active: true, message: task }])
  }
  const toggleActive = (id) => {
    setTasks(prev => prev.map(data => data.id === id ? { ...data, active: !data.active } : data))
  }

  useEffect(() => {
    const ts = JSON.parse(localStorage.getItem("tasks"))
    if (ts && ts.length > 0) {
      setTasks(ts)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <ToastContainer autoClose={5000} closeOnClick={true} position='top-center' />

      <div className="min-h-screen py-2 w-full text-2xl">
        <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-3">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Task Manager</h1>
          <div className="mb-4">
            <form onSubmit={add} className="flex">
              <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Enter your task"
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              />
              <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white">
                Add
              </button>
            </form>
            <div>
              <input
                type="checkbox"
                className="cursor-crosshair"
                checked={onlyActive}
                onChange={() => { setOnlyActive(prev => !prev) }}
              />
              <span className='ml-2'>Show only active</span>
            </div>
          </div>
          <div className="flex flex-wrap flex-col justify-evenly">
            {
              tasks.map(t => <Task updateTask={updateTask} task={t} key={t.id} toggleActive={toggleActive} deleteTask={deleteTask} onlyActive={onlyActive} />)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
