import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetTodoByIdAction } from "../redux/actions/users.actions";
import { ReducersType } from "../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";

const ViewTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const { loading, error, serverResponse } = useSelector(
    (state: ReducersType) => state.GetByIdTodo
  );

  useEffect(() => {
    if (id) {
      dispatch(GetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!serverResponse) return null;

  const task = serverResponse.data;

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
