import React, { useState, useEffect } from 'react'
import './styles.css'

function TodoApp() {
  return (
    <div className="todo">
      <div className="todo__container">
        <div className="todo__content">
          <h1 className="todo__title">
            What's up,{' '}
            <input className="name" type="text" placeholder="Aizanat" />
          </h1>
          <form className="todo__create-form">
            <h2 className="form__title">CREATE A TODO</h2>
            <h3 className="form__question">What's on your todo list ?</h3>
            <input
              className="form__answer"
              type="text"
              placeholder="e.g get a milk"
            />
            <div className="form__category-title">Pick a category</div>
            <div className="form__checkbox">
              <div className="form__category">
                <span className="circle business">Business</span>
              </div>
              <div className="form__category">
                <span className="circle personal">Personal</span>
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
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
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
