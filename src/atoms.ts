import { atom } from "recoil";



export interface ITodo {
  todoId: number;
  todoText: string;
}
interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    todo: [{todoId: 0, todoText: "hello"}, {todoId: 1, todoText: "world"}, {todoId: 2, todoText: "슬픈"}],
    doing: [{todoId: 3, todoText: "서울"}],
    done: [{todoId: 4, todoText: "살이"}],
  },
});
