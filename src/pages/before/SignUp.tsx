import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface SignUpData {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  resolution?: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignUpData>();

  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchPasswordCheck = watch("passwordCheck");
  const watchUsername = watch("username");

  const onSubmit = async (data: SignUpData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = {
        userId: userCredential.user.uid,
        email: data.email,
        username: data.username,
        resolution: data.resolution || "각오따위 없음",
        오전출석: 0,
        오후출석: 0,
        지각: 0,
        결석: 0,
        isManager: false,
        active: false,
      };
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, user);
      navigate("/");
    } catch (error) {
      const { code } = error as FirebaseError;
      switch (code) {
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일 입니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패하였습니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("회원가입에 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
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
        <Label htmlFor="passwordCheck">비밀번호 확인</Label>
        <Input
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해 주세요"
          autoComplete="password"
          {...register("passwordCheck", {
            required: "비밀번호체크는 필수 입력입니다.",
            validate: (value) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        <Label htmlFor="username">사용자 이름</Label>
        <Input
          id="username"
          type="text"
          placeholder="2~8자 이내여야 합니다."
          {...register("username", {
            required: "사용자 이름을 꼭 적어주세요.",
            pattern: {
              value: /^.{2,8}$/,
              message: "2자 이상 8자 이내로 입력해주세요",
            },
          })}
        />
        {errors.username && (
          <small role="alert">{errors.username.message}</small>
        )}
        <Label htmlFor="resolution">각오</Label>
        <Input
          id="resolution"
          type="text"
          placeholder="짧게 각오를 적어주세요"
          {...register("resolution", {})}
        />
        {errors.resolution && (
          <small role="alert">{errors.resolution.message}</small>
        )}
        <Button
          type="submit"
          disabled={
            !watchEmail ||
            !watchPassword ||
            !watchPasswordCheck ||
            !watchUsername ||
            Object.keys(errors).length > 0
          }
        >
          다음
        </Button>
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
