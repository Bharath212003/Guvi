import React from 'react';

const TodoCard = ({ todo, updateTodoStatus, editTodo, deleteTodo }) => {
  return (
    <div className="todo-card">
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <div>
        <label>Status: </label>
        <select
          value={todo.status}
          onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
        >
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button onClick={() => editTodo(todo.id)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoCard;
