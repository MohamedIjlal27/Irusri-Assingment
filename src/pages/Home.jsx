import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/Todo/TodoList';
import AddTodo from '../components/Todo/AddTodo';
import { useState } from 'react';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="container mx-auto p-4 bg-transparent">
        <div className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-lg bg-transparent">
          <h1 className="text-4xl font-bold text-white">Todo List</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="p-6 rounded-lg shadow-lg mb-6 bg-transparent">
          <AddTodo currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-transparent">
          <TodoList setCurrentTodo={setCurrentTodo} />
        </div>
      </div>
    </div>
  );
}

export default Home;
