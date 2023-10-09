import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { useForm } from "react-hook-form";

interface ICardProps {
  todoText: string;
  todoId: number;
  index: number;
  droppaleId: string;
}

interface IFormData {
  edit: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#ced6e0" : props.theme.cardBgColor};
  padding: 10px 10px;
  min-height: 50px;
  margin-bottom: 5px;

  box-shadow: ${(props) =>
    props.isDragging ? "0px 10px 5px rgb(0, 0, 0, 0.1)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnWrapper = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 20px;
`;

function DraggableCard({ todoId, todoText, index, droppaleId }: ICardProps) {
  const { register, handleSubmit } = useForm();
  const setTodos = useSetRecoilState(toDoState);
  const [edit, setEdit] = useState(false);
  const onDelClick = () => {
    setTodos((allBoards) => {
      const currentBoard = [...allBoards[droppaleId]];
      const newTodos = currentBoard.filter((todo) => todo.todoId !== todoId);

      return { ...allBoards, [droppaleId]: [...newTodos] };
    });
  };

  const onEditClick = () => {
    setEdit((prev) => !prev);
  };

  const onValid = (data: any) => {
    console.log(data);
    setTodos((allBoards) => {
      const currentBoard = allBoards[droppaleId];
      const updatedTodo = currentBoard.map((todo, idx) => {
        if (idx === todoId) {
          return { ...todo, todoText: data.edit };
        }
        return todo;
      });
      return {
        ...allBoards,
        [droppaleId]: updatedTodo,
      };
    });
    setEdit(false);
  };

  return (
    <Draggable key={index} draggableId={todoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {edit ? (
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("edit")}
                type="text"
                placeholder="할 일을 입력하세요"
              />
            </form>
          ) : (
            <span>{todoText}</span>
          )}

          <BtnWrapper>
            <Btn onClick={onDelClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-1 h-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Btn>
            <Btn onClick={onEditClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Btn>
          </BtnWrapper>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
