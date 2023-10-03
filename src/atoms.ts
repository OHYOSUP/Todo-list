import { atom } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    todo: ["a", "b", "c"],
    doing: ["asd", "dsdsd", "sadsd"],
    done: ["123", "2423", "58454"],
  },
});
