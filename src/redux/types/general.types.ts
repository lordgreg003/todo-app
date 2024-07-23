export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: {
    data: T;
    message: string;
    success: boolean;
  };
  error: any;
};

// export interface Task {
//   _id: string;
//   username: string;
//   email: string;
//   title: string;
//   status: boolean;
//   createdAt: string;
// }
export type ActionType = {
  type: string;
  payload: any;
};
