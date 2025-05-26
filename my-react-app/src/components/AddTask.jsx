import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../features/taskSlice';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">✍️ Create a New Task</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-200"
      >
        ➕ Add Task
      </button>
    </form>
  );
};

export default AddTask;
