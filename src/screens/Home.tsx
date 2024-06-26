import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Task from "../Task";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://chalynyx-todo-backend.onrender.com/api/getall/todo"
      );
      const data = response.data;

      console.log("API response:", data); // Log the API response

      if (data && Array.isArray(data.data)) {
        setTasks(data.data);
      } else {
        setTasks([]);
        setMessage("Invalid response format");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      setMessage("Error fetching tasks");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://chalynyx-todo-backend.onrender.com/api/delete/todo/${id}`
      );
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage(`Deleted task with ID: ${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage("Error deleting task");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}
        <div className="flex justify-end mb-4">
          <Link
            to="/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Task
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                    {task._id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                    {task.username}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                    {task.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm break-words">
                    {task.title}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {task.status ? "Completed" : "Pending"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(task.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-y-2 sm:space-y-0 sm:space-x-2">
                    <Link
                      to={`/view/${task._id}`}
                      className="text-blue-500 hover:text-blue-700 block sm:inline-block"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${task._id}`}
                      className="text-blue-500 hover:text-blue-700 block sm:inline-block"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700 block sm:inline-block"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
