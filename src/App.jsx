import { useEffect, useState } from "react"
import "./style.css"

export default function App(){
  const [newItem, setNewItem] = useState("Add task")   
  const [todo, setTodo] = useState(() => {
    // Retrieve stored items from localStorage
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  // Save todo items to localStorage whenever there's a change
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todo))
  }, [todo])

  function handleSubmit(e) {
    e.preventDefault() 

    // Add new item to the todo list
    setTodo(currentTodo => [
      ...currentTodo,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ])
    setNewItem("")
  }
  
  function toggleTodo(id, completed) {
    // Update the completion status of a todo item
    setTodo(currentTodo => {
      return currentTodo.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  
  function deleteTodo(id) {
    // Remove a todo item from the list
    setTodo(currentTodo => {
      return currentTodo.filter(todo => todo.id !== id)
    })    
  }

  return (
    <>
      {/* Form to add new items */}
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label>New Item</label>
          <input
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            type="text" 
            id="item"
          />
        </div>
        <button className="btn">Add Item</button>
      </form>
      
      <h1 className='header'>Your Tasks</h1> 
      
      <ul className="list">
        {/* Display message if no tasks are available */}
        {todo.length === 0 && "No Tasks Available"}
        
        {/* Display the list of tasks */}
        {todo.map(item => (
          <li key={item.id}>
            <label>
              {/* Checkbox to toggle task completion */}
              <input
                type="checkbox"
                checked={item.completed} 
                onChange={e => toggleTodo(item.id, e.target.checked)}
              />
              {/* Task title */}
              {item.title}
            </label>
            
            {/* Button to delete a task */}
            <button onClick={() => deleteTodo(item.id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
        }