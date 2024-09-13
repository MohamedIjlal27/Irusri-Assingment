import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
