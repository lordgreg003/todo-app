import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import Task from "../Task";

const UpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://chalynyx-todo-backend.onrender.com/api/getbyid/todo/${id}`
        );
        const taskData = response.data?.data;
        console.log(response.data?.data);

        setTask(taskData);
        setUsername(taskData.username);
        setEmail(taskData.email);
        setTitle(taskData.title);
        setText(taskData.text);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTask = { username, email, title, text, status: false };
      await axios.put(
        `https://chalynyx-todo-backend.onrender.com/api/update/todo/${id}`,
        updatedTask
      );
      alert("Task updated successfully!");
      navigate("/"); // Redirect to home page after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <section>
      <div className="flex flex-col mt-24">
        <div className="mx-auto w-96">
          <Link to={"/"} className="float-left flex flex-row space-x-0">
            <IoIosArrowBack className="text-3xl hover:text-4xl" /> &nbsp;{" "}
            <span className="text-xl">Back</span>
          </Link>
        </div>
        <h1 className="mx-auto text-2xl mb-5 hover:text-4xl">Update Task</h1>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="flex flex-col space-y-3">
            <div className="">
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="">
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="">
              <textarea
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="">
              <button
                className="bg-blue-800 text-center border-2 hover:bg-blue-600 rounded-lg p-2 text-white w-96"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePage;
