import styled from "styled-components";

const MessageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -130px;
  margin-top: -70px;
  width: 50vw;
  z-index: 999;
`;

const MessageBox = styled.span`
  width: 800px;
  color: #fff;
  font-weight: 550;
`;

interface IMessage<T> {
  message: T;
}

function ErrorMessage<T>({ message }: IMessage<T>) {
  return (
    <MessageWrapper>
      <MessageBox>{message}</MessageBox>
    </MessageWrapper>
  );
}

export default ErrorMessage;
