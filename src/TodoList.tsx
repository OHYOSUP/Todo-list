import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  console.log(errors);
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "please confirm your password" },
        { shouldFocus: true }
      );
    }
    console.log(data);
  };
  return (
    <div>
      <FormWrapper onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "You should fill this FormWrapper",
            pattern: {
              value: /[A-Za-z0-9._%+-]+@naver.com/,
              message: "Only naver.com is allowed",
            },
          })}
          placeholder="enter your email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "You should fill this form",
            validate: (value) =>
              value.includes("yosup")
                ? "you cannot use that name : yosup"
                : false,
          })}
          placeholder="enter your first name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "You should fill this form" })}
          placeholder="enter your last name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("password", {
            required: "You should fill this form",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="enter your password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("passwordConfirm", {
            required: "You should fill this form",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="enter your email"
        />
        <span>{errors?.passwordConfirm?.message}</span>
        <button>Enter</button>
      </FormWrapper>
    </div>
  );
}
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export default TodoList;
