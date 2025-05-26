import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Learn React",
      description: "Understand components, props, and state.",
      status: "To Do",
    },
    {
      id: 2,
      title: "Build a Redux App",
      description: "Manage state with Redux Toolkit.",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Polish UI",
      description: "Apply Tailwind CSS to make it look good.",
      status: "Completed",
    }
  ],
  loading: false,
  error: null,
  status: 'All', // For filtering
};

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
  }
});

export const { addTask, editTask, deleteTask, setStatusFilter } = taskSlice.actions;
export default taskSlice.reducer;
