import { useForm } from "react-hook-form";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const CreateBoardBgWrapper = styled.div`
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function CreateBoards({ modalRef, modalOutSideClick, setIsOpen }: IIsOpen) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [board, setBoard] = useRecoilState(toDoState);

  const onValid = ({ boardName }: any) => {
    const newBoard = {
      [boardName]: [],
    };
    setBoard((allBoard) => [...allBoard, newBoard]);
    setIsOpen(false);
    navigate(`/${boardName}`);
  };

  useEffect(() => {
    const escKeyModalClose = (e: { keyCode: number; }) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  return (
    <CreateBoardBgWrapper ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
      <CreateBoardForm onSubmit={handleSubmit(onValid)}>
        <CreateBoardInput
          {...register("boardName", {
            required: true,
            minLength: {
              value: 2,
              message: "보드 이름은 최소 2글자 이상입니다.",
            },
          })}
          type="text"
          placeholder="보드 이름을 입력하세요"
        />
      </CreateBoardForm>
      {errors && <ErrorMessage message={errors.boardName?.message} />}
    </CreateBoardBgWrapper>
  );
}

export default CreateBoards;
