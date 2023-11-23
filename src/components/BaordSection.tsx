import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useHref } from "react-router-dom";
import { useState, useRef } from "react";
import CreateBoards from "./CreateBoard";

const BoardSectionWrapper = styled.div`
  width: 17vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const BoardListTitle = styled.h2`
  margin-top: 100px;
  font-weight: 800;
  font-size: 21px;
  color: orange;
`;
const BoardList = styled.ul`
  margin-top: 50px;
`;
const Boards = styled.li`
  margin-bottom: 30px;
  cursor: pointer;
`;

const Board = styled.p`
  font-weight: 550;
  margin-bottom: 50px;
`;

const PlusIconWrapper = styled.div`
  cursor: pointer;
`;

//! Board Create 해야함

function BoardSection() {
  const [isOpen, setIsOpen] = useState(false);
  const boardList = useRecoilValue(toDoState);
  const [todos, setTodos] = useRecoilState(toDoState);

  const boardArr = boardList.map((v, i) => Object.keys(v)).flat();
  const modalRef = useRef<HTMLDivElement>(null);
  const plusOnClick = () => {
    setIsOpen(true);
  };

  const modalOutSideClick = (e: any) => {
    console.log(e)
    if (e.target === modalRef.current) {
      setIsOpen(false);
    }

    window.addEventListener("keydown", (e)=>{
      if(e.keyCode === 27){
        setIsOpen(false)
      }
    });
  };
  return (
    <BoardSectionWrapper>
      {isOpen && (
        <CreateBoards
          modalRef={modalRef}
          modalOutSideClick={modalOutSideClick}
          setIsOpen = {setIsOpen}
        />
      )}
      <BoardListTitle>Board List</BoardListTitle>
      <BoardList>
        {boardArr.map((board, index) => (
          <Link key={index} to={`${board}`}>
            <Boards>
              <Board>{board}</Board>
            </Boards>
          </Link>
        ))}
        <PlusIconWrapper onClick={plusOnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </PlusIconWrapper>
      </BoardList>
    </BoardSectionWrapper>
  );
}

export default BoardSection;
