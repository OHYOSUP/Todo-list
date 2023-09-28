import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function Todo({ text, categories, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  // const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const {
  //     currentTarget: { name },
  //   } = event;

  //   setToDos((oldToDos) => {
  //     const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
  //     const oldTodo = oldToDos[targetIndex];
  //     const newTodo = { text, id, categories: name };
  //     return oldToDos;
  //   });
  // };

  const onClick = (newCategory: IToDo["categories"]) => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);      
      const newTodo = { text, id, categories: newCategory };

      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categories !== "TO_DO" && (
        <button name="TO_DO" onClick={() => onClick("TO_DO")}>
          TO_DO
        </button>
      )}
      {categories !== "DOING" && (
        <button name="DOING" onClick={() => onClick("DOING")}>
          DOING
        </button>
      )}
      {categories !== "DONE" && (
        <button name="DONE" onClick={() => onClick("DONE")}>
          DONE
        </button>
      )}
    </li>
  );
}

export default Todo;
