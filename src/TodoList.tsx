import { useRecoilValue } from "recoil";
import CreateToDos from "./components/CreateToDos";
import Todo from "./components/Todo";
import { toDoState } from "./atoms";

function TodoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>TO DO LIST</h1>
      <hr />
      <CreateToDos />
      <ul>
        {toDos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
