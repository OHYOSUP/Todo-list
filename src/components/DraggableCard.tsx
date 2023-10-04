import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  todoText: string;
  todoId: number;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#ced6e0" : props.theme.cardBgColor};
  padding: 10px 10px;
  min-height: 20px;
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 10px 5px rgb(0, 0, 0, 0.1)" : "none"};
`;

function DraggableCard({ todoId, todoText, index }: ICardProps) {
  return (
    <Draggable key={index} draggableId={todoId+""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
