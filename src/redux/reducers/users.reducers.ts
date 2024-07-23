import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  CREATE_TODO_RESET,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_RESET,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_RESET,
  GETBYID_TODO_REQUEST,
  GETBYID_TODO_SUCCESS,
  GETBYID_TODO_FAIL,
  GETBYID_TODO_RESET,
  GET_ALL_TODO_REQUEST,
  GET_ALL_TODO_SUCCESS,
  GET_ALL_TODO_FAIL,
  GET_ALL_TODO_RESET,
} from "../constants/users.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";
import { LOGIN_RESET } from "../constants/auth.constants";

export const CreateTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UpdateTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_TODO_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const DeleteTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case DELETE_TODO_REQUEST:
      return { ...initialState, loading: true };
    case DELETE_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case DELETE_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const GetTodoByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GETBYID_TODO_REQUEST:
      return { ...initialState, loading: true };
    case GETBYID_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GETBYID_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GETBYID_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const GetTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_ALL_TODO_REQUEST:
      return { ...initialState, loading: true };
    case GET_ALL_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_ALL_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ALL_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
