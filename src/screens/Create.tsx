import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// interface CreatePageProps {
//   onCreate: (newTask: Partial<Task>) => void;
// }

const Create = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://chalynyx-todo-backend.onrender.com/api/todo/create",
        {
          username,
          email,
          title,
          text,
          status: false, // Default status
        }
      );
      alert("Task Created successfully!");
      navigate("/");

      const data = response.data;
      console.log(data);
      // onCreate(data.data); // Update state in parent component (HomePage)

      // Clear form fields
      setUsername("");
      setEmail("");
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4">Create New Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Text
            </label>
            <textarea
              id="text"
              rows={3}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
          <div>
            {" "}
            <Link to="/" className="text-blue-500 mt-4 inline-block">
              Back to List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
