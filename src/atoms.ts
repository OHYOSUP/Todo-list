import { atom, selector } from "recoil";



export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  categories: Categories
  id: number;
  text: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    if (category === Categories.TO_DO)
      return toDos.filter((todo) => todo.categories === Categories.TO_DO);
    if (category === Categories.DOING)
      return toDos.filter((todo) => todo.categories === Categories.DOING);
    if (category === Categories.DONE)
      return toDos.filter((todo) => todo.categories === Categories.DONE);
  },
});
