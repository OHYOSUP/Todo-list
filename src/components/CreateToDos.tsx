import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}
function CreateToDos() {
  const setToDos = useSetRecoilState(toDoState)
  const categories = useRecoilValue(categoryState)
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), categories },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "You should fill this form",
        })}
        placeholder="enter your email"
      />
      <button>Enter</button>
    </form>
  );
}

export default CreateToDos;
