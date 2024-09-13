import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../redux/todoSlice';

function AddTodo({ currentTodo, setCurrentTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTodo) {
      dispatch(updateTodo({
        id: currentTodo.id,
        title,
        description,
      }));
      setCurrentTodo(null);
    } else {
      dispatch(addTodo({
        id: Date.now(),
        title,
        description,
        completed: false,
      }));
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-blue-500">
      <h2 className="text-2xl font-bold mb-6 text-white">{currentTodo ? 'Update Todo' : 'Add Todo'}</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>
      <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white p-2 rounded transition duration-300">
        {currentTodo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
}

export default AddTodo;
