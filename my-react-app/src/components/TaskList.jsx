import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodo, deleteTask ,setStatusFilter} from '../features/taskSlice';
import EditTasks from './EditTasks';

const TaskList = () => {
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);
    const dispatch = useDispatch();
    const allTasks = useSelector((state) => state.tasks.tasks);
    const statusFilter = useSelector((state) => state.tasks.status);

const tasks = statusFilter === 'All'
  ? allTasks
  : allTasks.filter((task) => task.status === statusFilter);



    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }

    if (loading) return <p className="text-center text-blue-600">Loading tasks...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <option value="All">All</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 flex justify-between items-start"
                    >
                        <div className="flex-1 pr-4">
                            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                            {task.description && (
                                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            )}
                            <p className="text-sm font-medium mt-2">
                                Status: <span className="italic text-blue-600">{task.status}</span>
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <EditTasks
                                task={task}
                            />

                            <button onClick={() => handleDelete(task.id)} className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
