import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Task from "../Task";

const ViewTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const response = await axios.get(
          `https://chalynyx-todo-backend.onrender.com/api/getbyid/todo/${id}`,
          config
        );

        console.log(response.data?.data);

        setTask(response.data?.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <p>
        <strong>Name:</strong> {task.username}
      </p>
      <p>
        <strong>Email:</strong> {task.email}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Status:</strong> {task.status ? "Completed" : "Pending"}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
      </p>
      <Link to="/" className="text-blue-500 mt-4 inline-block">
        Back to List
      </Link>
    </div>
  );
};

export default ViewTask;
