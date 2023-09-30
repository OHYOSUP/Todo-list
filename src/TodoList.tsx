import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDos from "./components/CreateToDos";
import Todo from "./components/Todo";
import { Categories, categoryState, toDoSelector } from "./atoms";

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.currentTarget.value;
    setCategory(target as any);
  };

  console.log(toDos)
  return (
    <div>
      <h1>TO DO LIST</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDos />
      <h1>To Do</h1>
      <hr />
      <ul>
        {toDos?.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
