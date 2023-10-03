import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  todo: string;
  index: number;
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 10px;
  min-height: 20px;
  margin-bottom: 5px;
`;

function DraggableCard({ todo, index }: ICardProps) {  
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic) => (
        <Card
          {...magic.dragHandleProps}
          ref={magic.innerRef}
          {...magic.draggableProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
