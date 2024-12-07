export interface TasksProps {
  title: string;
  date: string;
  status: "Completed" | "Incomplete";
}
export interface TodoListStateProps {
  IconDel: string;
  IconEdit: string;
  isOpenAddTask: boolean;
  tasks: TasksProps[];
  taskEdit: TasksProps;
  taskEditIndex:number;
  taskStatus: string;
  taskStatusOptions: { label: string; value: string }[];
  isOpenAlert: boolean;
}

export const initTasks: TasksProps=  {
  title: "",
  date: "",
  status: "Incomplete",
}

const TodoListState: TodoListStateProps = {
  IconDel: require("@/assets/icons/icon-del.png"),
  IconEdit: require("@/assets/icons/icon-pencil.png"),
  isOpenAddTask: false,
  tasks: [],
  taskEdit:initTasks,
  taskEditIndex:-1,
  taskStatus: "All",
  taskStatusOptions: [
    { label: "All", value: "All" },
    { label: "Completed", value: "Completed" },
    { label: "Incomplete", value: "Incomplete" },
  ],
  isOpenAlert: false
};

export default TodoListState;
