import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo, updateTodo } from '../../redux/todoSlice';
import TodoItem from './TodoItem';

function TodoList({ setCurrentTodo }) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleUpdate = (todo) => {
    setCurrentTodo(todo);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => dispatch(deleteTodo(todo.id))}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onUpdate={() => handleUpdate(todo)}
        />
      ))}
    </div>
  );
}

export default TodoList;
