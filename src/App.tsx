import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import TodoLists from "./components/TodoLists";
import MyProfile from "./components/MyProfile";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const BoardListWrapper = styled.div`
  width: 18vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
`;

function App() {
  return (
    <Wrapper>
      <BoardListWrapper>
        <MyProfile />
        <Link to="/TodoLists">Board1</Link>
      </BoardListWrapper>
      <Routes>
        <Route path="/TodoLists" element={<TodoLists />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
