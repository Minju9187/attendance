import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logIn } from "@/reducers/store";

interface SignInData {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInData>();

  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const dispatch = useDispatch();

  const onSubmit = async (data: SignInData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigate("/home");
      window.localStorage.setItem("userId", userCredential.user.uid);
      dispatch(logIn(true));
    } catch (error) {
      const { code } = error as FirebaseError;
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/email-already-in-use":
        case "auth/weak-password":
        case "auth/invalid-email":
        case "auth/invalid-credential":
          alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패하였습니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("로그인에 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="password"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
        <Button type="submit" disabled={!watchEmail || !watchPassword}>
          로그인
        </Button>
        <Button onClick={() => navigate("/signup")}>회원가입</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #767676;
  margin-bottom: 6px;
`;

const Input = styled.input`
  border-bottom: 1px solid rgb(219, 219, 219);
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 322px;
  height: 44px;
  background-color: #ff4948;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: white;
  border-radius: 30px;
  font-weight: 500px;
  font-size: 14px;
  margin-bottom: 10px;
`;
