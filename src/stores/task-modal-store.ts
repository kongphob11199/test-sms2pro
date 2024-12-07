
import { TasksProps } from "./task-store"

interface TodoListAddModalState {
    tasks: TasksProps,
    error:{
        title:string,}
}

const TodoListAddModalState: TodoListAddModalState = {
    tasks: {
        title: "",
        date: "",
        status: "Incomplete",
    },
    error:{
        title:""
    }
  };

export default TodoListAddModalState;