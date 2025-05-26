import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Task Management App
        </h2>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
