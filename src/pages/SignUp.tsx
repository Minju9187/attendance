import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { VALIDATION_MESSAGE } from "@/constants/messages";
import { REGEX } from "@/constants/regex";
import { auth } from "@/firebase";
import { useImageUpload } from "@/hooks/useImageUpload";
import { UserData } from "@/types/types";
import {
  createUserInFirestore,
  deleteImageFromStorage,
  uploadImageAndGetUrl,
} from "@/utils/firebaseUtils";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignUpData = {
  image?: FileList | null;
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignUpData>({ mode: "onChange", reValidateMode: "onChange" });
  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchPasswordCheck = watch("passwordCheck");
  const watchUsername = watch("username");
  const imageFile = watch("image")?.[0];
  const preview = useImageUpload(imageFile);

  async function onSubmit(data: SignUpData) {
    let imageUrl = "";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (data.image && data.image[0]) {
        imageUrl = await uploadImageAndGetUrl(data.image[0]);
      }

      const user: UserData = {
        userId: userCredential.user.uid,
        image: imageUrl,
        email: data.email,
        username: data.username,
        totalStudyTime: 0,
        totalMonthStudyTime: 0,
        totalWeekStudyTime: 0,
        activeStudy: 0,
        completedStudy: 0,
        follower: [],
        following: [],
      };

      await createUserInFirestore(user);

      navigate("/login");
    } catch (error) {
      const { code, message } = error as FirebaseError;
      console.error("회원가입 오류", code, message);

      if (auth.currentUser) {
        await deleteUser(auth.currentUser).catch((deleteErr) => {
          console.error("계정 삭제 중 오류:", deleteErr);
        });
      }

      if (imageUrl) {
        await deleteImageFromStorage(imageUrl);
      }

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
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col p-10"
      >
        <h2 className="mb-11 text-center text-3xl font-bold">회원가입</h2>
        <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-gray-100">
          {preview ? (
            <img
              src={preview}
              alt="미리보기"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-sm text-gray-400">
              이미지 없음
            </span>
          )}
          <label
            htmlFor="image"
            className="absolute top-30 h-32 w-32 cursor-pointer rounded-full"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("image")}
          />
        </div>
        <Input
          label="이메일"
          labelClassName="mt-5 mb-1 font-bold text-gray-500"
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
        <Input
          label="비밀번호 확인"
          labelClassName="mt-5 mb-1 font-bold text-gray-500"
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          autoComplete="password"
          {...register("passwordCheck", {
            required: VALIDATION_MESSAGE.passwordCheck.required,
            validate: (value) =>
              value === getValues("password") ||
              VALIDATION_MESSAGE.passwordCheck.validate,
          })}
          error={errors.passwordCheck?.message}
        />
        <Input
          label="별명"
          labelClassName="mt-5 mb-1 font-bold text-gray-500"
          id="username"
          type="text"
          placeholder="2~8자 이내여야 합니다."
          {...register("username", {
            required: VALIDATION_MESSAGE.username.required,
            validate: (value) => {
              if (value.length < 2 || value.length > 8) {
                return VALIDATION_MESSAGE.username.pattern;
              }
              if (!REGEX.username.test(value)) {
                return VALIDATION_MESSAGE.username.invalidChar;
              }
              return true;
            },
          })}
          error={errors.username?.message}
        />
        <Button
          type="submit"
          disabled={
            !watchEmail ||
            !watchPassword ||
            !watchPasswordCheck ||
            !watchUsername
          }
          variant="blue"
          size="lg"
          className="mt-5"
        >
          회원가입
        </Button>
        <div className="mt-3 flex justify-end">
          <Button
            variant="gray"
            size="sm"
            className="font-bold"
            onClick={() => navigate("/login")}
          >
            로그인하러 가기
          </Button>
        </div>
      </form>
    </>
  );
}
