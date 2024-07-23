import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import { initialState as initialStateReducer } from "./initial.state";
import {
  CreateTodoReducer,
  DeleteTodoReducer,
  GetTodoByIdReducer,
  GetTodoReducer,
  UpdateTodoReducer,
} from "./reducers/users.reducers";
import { ReduxResponseType } from "./types/general.types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
// import { RootState } from './store'; /

export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  undefined,
  Action<string>
>;

// Define Redux state types
export interface RootState {
  CreateTodo: any; // Define the actual type based on your application
  UpdateTodo: any;
  DeleteTodo: any;
  GetByIdTodo: any;
  GetAllTodo: any;
}

export type ReducersType = {
  // Todo
  CreateTodo: ReduxResponseType;
  UpdateTodo: ReduxResponseType;
  DeleteTodo: ReduxResponseType;
  GetByIdTodo: ReduxResponseType;
  GetAllTodo: ReduxResponseType;
};

const reducer = combineReducers<ReducersType>({
  // Todo
  CreateTodo: CreateTodoReducer,
  UpdateTodo: UpdateTodoReducer,
  DeleteTodo: DeleteTodoReducer,
  GetByIdTodo: GetTodoByIdReducer,
  GetAllTodo: GetTodoReducer,
});

const middleware = [thunk];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
