// Task.ts or Task.tsx
export interface Task {
  _id: string;
  username: string;
  email: string;
  title: string;
  text: string;
  status: boolean;
  createdAt: string;
}
export default Task;
