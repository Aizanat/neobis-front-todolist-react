import React, { useState, useEffect } from 'react'
import './styles.css'

function TodoApp() {
  const [userName, setUserName] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [category, setCategory] = useState('business')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName')
    if (storedUserName) {
      setUserName(storedUserName)
    }

    const storedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleInputChange = (event) => {
    setTaskInput(event.target.value)
  }

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const todo = {
      content: taskInput,
      category: category,
      done: false,
      createdAt: new Date().getTime(),
    }
    setTodos([...todos, todo])
    setTaskInput('')
  }

  const handleToggleDone = (index) => {
    const updatedTodos = [...todos]
    updatedTodos[index].done = !updatedTodos[index].done
    setTodos(updatedTodos)
  }

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
  }

  return (
    <div className="todo">
      <div className="todo__container">
        <div className="todo__content">
          <h1 className="todo__title">
            What's up,{' '}
            <input
              className="name"
              type="text"
              placeholder="Aizanat"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </h1>
          <form className="todo__create-form" onSubmit={handleSubmit}>
            <h2 className="form__title">CREATE A TODO</h2>
            <h3 className="form__question">What's on your todo list ?</h3>
            <input
              className="form__answer"
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              placeholder="e.g get a milk"
            />
            <div className="form__category-title">Pick a category</div>
            <div className="form__checkbox">
              <div className="form__category">
                <span
                  className={`circle business ${
                    category === 'business' ? 'businessActive' : ''
                  }`}
                  onClick={() => handleCategoryChange('business')}
                >
                  Business
                </span>
              </div>
              <div className="form__category">
                <span
                  className={`circle personal ${
                    category === 'personal' ? 'personalActive' : ''
                  }`}
                  onClick={() => handleCategoryChange('personal')}
                >
                  Personal
                </span>
              </div>
            </div>
            <button className="btn form__category-btn">Add todo</button>
          </form>
          <section className="todo-list">
            <h3 className="todo__list-title">TODO LIST</h3>
            <div className="list">
              {todos.map((todo, index) => (
                <div className="todo-item" key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleToggleDone(index)}
                      className={`circle ${
                        todo.category === 'personal' ? 'personal' : 'business'
                      }`}
                    />
                  </label>
                  <div className="todo-content">
                    <input
                      type="text"
                      value={todo.content}
                      readOnly={true}
                      className={todo.done ? 'done' : ''}
                    />
                  </div>
                  <div className="actions">
                    <button
                      className="edit"
                      onClick={() => handleToggleDone(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
