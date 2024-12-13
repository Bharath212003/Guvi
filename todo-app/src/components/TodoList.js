import React, { useState } from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ todos, updateTodoStatus, editTodo, deleteTodo }) => {
  const [filter, setFilter] = useState('All');

  const filteredTodos =
    filter === 'All'
      ? todos
      : todos.filter((todo) => todo.status === filter);

  return (
    <div>
      <label>Filter: </label>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
      </select>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            updateTodoStatus={updateTodoStatus}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
