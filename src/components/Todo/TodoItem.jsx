import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div className="flex-1">
        <h3 className={`text-2xl font-bold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
          {todo.description}
        </p>
      </div>
      <div className="flex space-x-4 items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-green-500"
        />
        <button onClick={onUpdate} className="text-yellow-500 hover:text-yellow-600 transition duration-300">
          <FontAwesomeIcon icon={faEdit} size="lg" />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-600 transition duration-300">
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
