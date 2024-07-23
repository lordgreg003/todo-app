import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the path accordingly
import {
  GetTodoByIdAction,
  UpdateTodoAction,
} from "../redux/actions/users.actions"; // Adjust the path accordingly
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThunkDispatch } from "redux-thunk";
import { ServerResponse } from "http";

const UpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const todoDetails = useSelector((state: RootState) => state.GetByIdTodo);
  const { loading, error, serverResponse } = todoDetails;
  // console.log(todoDetails);

  console.log(serverResponse.data);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(GetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (serverResponse.data) {
      setUsername(serverResponse.data.username || "");
      setEmail(serverResponse.data.email || "");
      setTitle(serverResponse.data.title || "");
      setText(serverResponse.data.text || "");
    }
  }, [serverResponse.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(UpdateTodoAction({ id, username, email, title, text }));
      toast.success("Task updated successfully!", { position: "top-center" });
      setTimeout(() => navigate("/"), 3000); // Redirect to home page after 3 seconds
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <div className="flex flex-col mt-24">
        <div className="mx-auto w-96">
          <Link to="/" className="float-left flex flex-row space-x-0">
            <IoIosArrowBack className="text-3xl hover:text-4xl" />
            &nbsp;
            <span className="text-xl">Back</span>
          </Link>
        </div>
        <h1 className="mx-auto text-2xl mb-5 hover:text-4xl">Update Task</h1>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="flex flex-col space-y-3">
            <div>
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className="border-slate-600 border-2 hover:border-4 rounded-lg p-1 w-96"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue-800 text-center border-2 hover:bg-blue-600 rounded-lg p-2 text-white w-96"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UpdatePage;
