import styled from "styled-components";

const CreateBoardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  hidden: true;
  background-color: rgba(0, 0, 0, 0.5);

  top: 0;
  left: 0;
  position: absolute;
`;

const CreateBoardForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  background-color: #fff;
`;

const CreateBoardInput = styled.input`
  min-width: 500px;
  padding: 15px;
  font-weight: 550;
`;

interface IIsOpen {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick: (e: any) => void;
}
function CreateBoards({ modalRef, modalOutSideClick }: IIsOpen) {
  return (
    <CreateBoardWrapper ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
      <CreateBoardForm>
        <CreateBoardInput
          type="text"
          required
          placeholder="보드 이름을 입력하세요"
        />
      </CreateBoardForm>
    </CreateBoardWrapper>
  );
}

export default CreateBoards;
