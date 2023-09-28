import { atom } from "recoil";


export interface IToDo {
  categories: "TO_DO" | "DOING" | "DONE";
  id: number;
  text: string;
}


export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});