import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

interface IToDo {
  categories: "TO_DO" | "DOING" | "DONE";
  id: number;
  text: string;
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
interface IForm {
  toDo: string;
}

function TodoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    console.log(toDos);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), categories: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>TO_DO</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "You should fill this form",
          })}
          placeholder="enter your email"
        />
        <button>Enter</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
