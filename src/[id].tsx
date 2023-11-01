import { useParams } from "react-router-dom";
import { toDoState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./components/Board";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
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

function Boards() {
  const { board = "" } = useParams<{ board: string }>();
  const [todos, setTodos] = useRecoilState(toDoState);

  const boardTitle = useRecoilValue(toDoState);
const arr = [1,2,3]
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { draggableId, destination, source } = info;
    if (!destination) return;
    setTodos((allBoards) => {
      const updatedTodo = allBoards.map((board, index) => {
        if (Object.keys(board)[0] === source.droppableId) {
          const currentBoard = [...board[source.droppableId]];
          const taskObj = currentBoard[source.index];
          currentBoard.splice(source.index, 1);
          currentBoard.splice(destination.index, 0, taskObj);
          return {
            [source.droppableId]: currentBoard,
          };
        }
        if (Object.keys(board)[0] === destination.droppableId) {
          const currentBoard = [...board[destination.droppableId]];
          const taskObj = currentBoard[source.index];
          currentBoard.splice(source.index, 1);
          currentBoard.splice(destination.index, 0, taskObj);
          return {
            [destination.droppableId]: currentBoard,
          };
        }
        return board;
      });
      return updatedTodo;
    });
    // if (source.droppableId === destination?.droppableId) {
    //   setTodos((allBoards) => {
    //     const updatedTodo = allBoards.map((board, index) => {
    //       const currentBoard = board[source.droppableId];
    //       const taskObj = currentBoard[source.index];
    //       currentBoard.splice(source.index, 1);
    //       currentBoard.splice(destination.index, 0, taskObj);
    //       return {
    //         ...board,
    //         [source.droppableId] : [...currentBoard]
    //       }
    //     });
    //     return updatedTodo
    //     // const boardCopy = [...allBoards];
    //     // const taskObj = boardCopy[source.index];
    //     // boardCopy.splice(source.index, 1);
    //     // boardCopy.splice(destination.index, 0, taskObj);

    //     // return {
    //     //   ...allBoards,
    //     //   [source.droppableId]: boardCopy,
    //     // };
    //   });
    // }
    // if (source.droppableId !== destination.droppableId) {
    //   setTodos((allBoards) => {
    //     const sourceBoard = [...allBoards[source.index][source.droppableId]];
    //     const destinationBoard = [
    //       ...allBoards[source.index][destination.droppableId],
    //     ];
    //     const taskObj = sourceBoard[source.index];
    //     sourceBoard.splice(source.index, 1);
    //     destinationBoard.splice(destination?.index, 0, taskObj);

    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoard,
    //       [destination.droppableId]: destinationBoard,
    //     };
    //   });
    // }
  };

  return (
    <Wrapper>
      <ul>
        <DragDropContext onDragEnd={onDragEnd}>
          <BoardWrapper>
            <GridWrapper>
              {boardTitle.map((todo, index) => {
                if (Object.keys(todo)[0] === board)
                  return (
                    <Board
                      key={index}
                      todos={todo[board]}
                      droppaleId={board}
                      todoIndex={index}
                    />
                  );
                else return;
              })}
            </GridWrapper>
          </BoardWrapper>
        </DragDropContext>
      </ul>
    </Wrapper>
  );
}

export default Boards;
