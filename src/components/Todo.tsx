import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

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

  const onClick = (newCategory: Categories) => {
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

// 에러해결

  return (
    <li>
      <span>{text}</span>
      {categories !== Categories.TO_DO && (
        <button
          name={Categories.TO_DO + ""}
          onClick={() => onClick(Categories.TO_DO)}
        >
          TO_DO
        </button>
      )}
      {categories !== Categories.DOING && (
        <button
          name={Categories.DOING + ""}
          onClick={() => onClick(Categories.DOING)}
        >
          DOING
        </button>
      )}
      {categories !== Categories.DONE && (
        <button
          name={Categories.DONE + ""}
          onClick={() => onClick(Categories.DONE)}
        >
          DONE
        </button>
      )}
    </li>
  );
}

export default Todo;
