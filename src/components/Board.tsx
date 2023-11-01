import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
const Wrapper = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 10px 10px;
  margin-bottom: 10px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ff6b6b"
      : props.isDraggingFromThis
      ? "#576574"
      : ""};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;
const Form = styled.form`
  width: 100%;
`;

interface IForm {
  todo: string;
}
interface IBoardProps {
  todos: ITodo[];
  droppaleId: string;
  todoIndex: number;
}

function Board({ todos, droppaleId, todoIndex }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(toDoState);

  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      todoId: Date.now(),
      todoText: todo,
    };
    setTodos((allBoards) => {
      const updatedTodo = allBoards.map((board, index) => {
        if (index === todoIndex) {
          return {
            ...board,
            [droppaleId]: [newTodo, ...board[droppaleId]],
          };
        }
        return board;
      });
  
      return updatedTodo;
    });
    setValue("todo", "");
  };
  
  return (
    <Wrapper>
      <Title>{droppaleId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder="할 일을 입력하세요"
        />
      </Form>
      <Droppable droppableId={droppaleId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((item, index) => {
              return (
                <DraggableCard
                  key={item.todoId}
                  todoId={item.todoId}
                  todoText={item.todoText}
                  index={index}
                />
              );
            })}

            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
