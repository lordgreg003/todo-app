import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  // CREATE_TODO_RESET,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  // UPDATE_TODO_RESET,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  // DELETE_TODO_RESET,
  GETBYID_TODO_REQUEST,
  GETBYID_TODO_SUCCESS,
  GETBYID_TODO_FAIL,
  // GETBYID_TODO_RESET,
  GET_ALL_TODO_REQUEST,
  GET_ALL_TODO_SUCCESS,
  GET_ALL_TODO_FAIL,
  // GET_ALL_TODO_RESET,
} from "../constants/users.constants";
import {
  CreateTodoType,
  // ViewUserType,
  // DeleteUserType,
  UpdateTodoType,
} from "../types/users.types";
import { API_ROUTES } from "../routes";
// Define the ThunkAction type
import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";
// import { ReduxResponseType } from "../types/general.types";
import { RootState } from "../store";
import { ThunkResult } from "../store";

// export type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const CreateTodoAction =
  ({
    username,
    email,
    title,
    text,
  }: CreateTodoType): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState) => {
    try {
      dispatch({ type: CREATE_TODO_REQUEST });

      // Get the token from your state or any other place you store it
      const token = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token here
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.Todo?.create,
        { email, username, title, text },
        config
      );

      dispatch({
        type: CREATE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_TODO_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

export const deleteTodo =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: DELETE_TODO_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(
        `${API_ROUTES.Todo.delete}${id}`,
        config
      );
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: DELETE_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const GetTodoByIdAction =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GETBYID_TODO_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `${API_ROUTES.Todo.getByID}${id}`,
        config
      );

      dispatch({
        type: GETBYID_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GETBYID_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateTodoAction =
  ({ username, email, title, text, id }: UpdateTodoType): ThunkResult<void> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPDATE_TODO_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES.Todo.update}${id}`,
        {
          username,
          email,
          title,
          text,
        },
        config
      );

      dispatch({
        type: UPDATE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const GetAllTodosAction =
  (): ThunkResult<void> => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TODO_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(API_ROUTES.Todo.getAll, config);

      dispatch({
        type: GET_ALL_TODO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_ALL_TODO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
