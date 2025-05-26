import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../features/taskSlice';

const EditTasks = ({ task, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status,setStatus] = useState('To Do');
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(editTask({id: task.id, title , description , status }))
    setIsEdit(false);
  };

  return (
    <div>
      {isEdit ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Edit title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Edit description"
            rows={3}
          ></textarea>
          
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
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTasks;
