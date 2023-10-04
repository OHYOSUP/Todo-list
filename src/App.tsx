import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [todos, setTodos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;

    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];        
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index]        
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    // setTodos((oldTodos) => {
    //   const todosCopy = [...oldTodos];
    //   todosCopy.splice(source.index, 1);
    //   todosCopy.splice(destination?.index, 0, draggableId);
    //   return todosCopy
    // });
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardWrapper>
          <GridWrapper>
            {Object.keys(todos).map((boardId) => (
              <Board
                key={boardId}
                todos={todos[boardId]}
                droppaleId={boardId}
              />
            ))}
          </GridWrapper>
        </BoardWrapper>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
