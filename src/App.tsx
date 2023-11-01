import styled from "styled-components";
import BoardSection from "./components/BaordSection";
import {
  Route,  
  Routes,
} from "react-router-dom";
import Boards from "./[id]";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

function App() {  
  
  return (
    <Wrapper>
      <BoardSection />
      <Routes>
        <Route path="/:board" element={<Boards />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
