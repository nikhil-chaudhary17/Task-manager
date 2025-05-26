import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: 'All', // This is your filter status
};

export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();
  return data.map(task => ({
    id: task.id,
    title: task.title,
    description: '',
    status: task.completed ? "Completed" : "To Do", // Capitalized for consistency
  }));
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {   
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addTask, editTask, deleteTask, setStatusFilter } = taskSlice.actions;
export default taskSlice.reducer;
