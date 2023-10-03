import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 10px 10px;
  margin-bottom: 10px;
`;

interface IBoardProps {
  todos: string[];
  droppaleId: string;
}

function Board({ todos, droppaleId }: IBoardProps) {
  return (
    <>
      <Droppable droppableId={droppaleId}>
        {(magic) => (
          <Wrapper {...magic.droppableProps} ref={magic.innerRef}>
            <Title>{droppaleId}</Title>
            {todos.map((todo, index) => (
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </>
  );
}

export default Board;
