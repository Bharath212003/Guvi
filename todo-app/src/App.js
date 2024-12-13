import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const updateTodoStatus = (id, status) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  };

  const editTodo = (id) => {
    const name = prompt('Enter new name:');
    const description = prompt('Enter new description:');
    if (name && description) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, name, description } : todo
        )
      );
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>My Todo</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodoStatus={updateTodoStatus}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
