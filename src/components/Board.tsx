import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
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
  margin-top: 25px;
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;
const Btn = styled.div`
  width: 30px;
  cursor: pointer;
`;

const CreateInput = styled.input`
  width: 100%;
  padding: 10px;
`;

interface IForm {
  todo: string;
}
interface IBoardProps {
  todos: ITodo[];
  droppaleId: string;
}

function Board({ todos, droppaleId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(toDoState);
  const [createTodo, setCreateTodo] = useState(false);

  const toggleCreateTodo = () => {
    setCreateTodo((prev) => !prev);
  };

  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      todoId: Date.now(),
      todoText: todo,
    };
    console.log(todo);
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [droppaleId]: [...allBoards[droppaleId], newTodo],
      };
    });

    setValue("todo", "");
    setCreateTodo(false);
  };

  return (
    <Wrapper>
      <Title>{droppaleId}</Title>

      <Droppable droppableId={droppaleId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                key={todo.todoId}
                todoId={todo.todoId}
                todoText={todo.todoText}
                droppaleId={droppaleId}
                index={index}
              />
            ))}
            {createTodo ? (
              <Form onSubmit={handleSubmit(onValid)}>
                <CreateInput
                  {...register("todo", { required: true })}
                  type="text"
                  placeholder="할 일을 입력하세요"
                />
                <BtnWrapper>
                  <Btn onClick={toggleCreateTodo}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="0.3"
                      stroke="currentColor"
                      className="w-1 h-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Btn>
                </BtnWrapper>
              </Form>
            ) : (
              <BtnWrapper>
                <Btn onClick={toggleCreateTodo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="0.3"
                    stroke="currentColor"
                    className="w-1 h-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Btn>
              </BtnWrapper>
            )}

            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
