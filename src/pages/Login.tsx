import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { VALIDATION_MESSAGE } from "@/constants/messages";
import { REGEX } from "@/constants/regex";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInData>({ mode: "onChange", reValidateMode: "onChange" });

  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const navigate = useNavigate();

  async function onSubmit(data: SignInData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      navigate("/");
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
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col p-10"
      >
        <h2 className="mb-10 text-center text-3xl font-bold">로그인</h2>
        <Input
          label="이메일"
          labelClassName="mb-1 font-bold text-gray-500"
          id="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          {...register("email", {
            required: VALIDATION_MESSAGE.email.required,
            pattern: {
              value: REGEX.email,
              message: VALIDATION_MESSAGE.email.pattern,
            },
          })}
          error={errors.email?.message}
        />
        <Input
          label="비밀번호"
          labelClassName="mt-5 mb-1 font-bold text-gray-500"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="password"
          {...register("password", {
            required: VALIDATION_MESSAGE.password.required,
            minLength: {
              value: 8,
              message: VALIDATION_MESSAGE.password.minLength,
            },
          })}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          variant="blue"
          size="lg"
          disabled={!watchEmail || !watchPassword}
          className="mt-5"
        >
          로그인
        </Button>
        <div className="mt-1 flex justify-end">
          <Button
            variant="gray"
            size="sm"
            className="font-bold"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </div>
      </form>
    </>
  );
}
