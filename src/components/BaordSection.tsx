import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const BoardSectionWrapper = styled.div`
  width: 17vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const BoardList = styled.ul`
  margin-top: 100px;
`;
const Board = styled.li`
  margin-bottom: 30px;
  cursor: pointer;
`;

function BoardSection() {
  const boardList = useRecoilValue(toDoState);  

  const boardArr = boardList.map((v, i) => Object.keys(v)).flat();
  

  return (
    <BoardSectionWrapper>
      <h2>Board List</h2>
      <BoardList>
        {boardArr.map((board, index) => (
          <Link key={index} to={`${board}`}>
            <Board>
              <span>{board}</span>
            </Board>
          </Link>
        ))}
      </BoardList>
    </BoardSectionWrapper>
  );
}

export default BoardSection;
