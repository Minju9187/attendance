export const VALIDATION_MESSAGE = {
  email: {
    required: "이메일을 입력하지 않았습니다.",
    pattern: "이메일 형식에 맞지 않습니다.",
  },
  password: {
    required: "비밀번호는 필수 입력입니다.",
    minLength: "8자리 이상 비밀번호를 사용하세요.",
  },
  passwordCheck: {
    required: "비밀번호 확인은 필수 입력입니다.",
    validate: "비밀번호가 일치하지 않습니다.",
  },
  username: {
    required: "사용자 이름을 꼭 적어주세요.",
    pattern: "2자 이상 8자 이내, 한글/영어/숫자만 가능합니다.",
    invalidChar: "특수문자는 사용할 수 없습니다.",
  },
};
