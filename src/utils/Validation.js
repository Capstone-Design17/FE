// 유효성 검사
// 아이디 유효성 검사
export const isId = (id) => {
  const idRegex = new RegExp('[a-z0-9_-]{6,20}');
  return idRegex.test(id);
};

// 패스워드 유효성 검사
export const isPw = (pw) => {
  const pwRegex = new RegExp('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$');
  return pwRegex.test(pw);
};

// 패스워드 재확인

// const pwDoubleCheck = !isPwSame ? 'pwDoubleCheck' : undefined;

// 이름 유효성 검사
export const isName = (name) => {
  const nameRegex = new RegExp('^[가-힣]{2,20}$');
  return nameRegex.test(name);
};

// 별명 유효성 검사
export const isNickName = (nickName) => {
  const nickNameRegex = new RegExp('^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$');
  return nickNameRegex.test(nickName);
};

// 휴대폰 번호 유효성 검사
export const isPhone = (phone) => {
  const phoneRegex = new RegExp('01[016789][^0][0-9]{2,3}[0-9]{4,4}');
  return phoneRegex.test(phone);
};

// 이메일 유효성 검사
export const isEmail = (email) => {
  const emailRegex = new RegExp('[a-z0-9_+.-]+@([a-z0-9-]+\\.)+[a-z0-9]{2,4}$');
  return emailRegex.test(email);
};

// 생년월일 입력여부 확인
export const isBirth = (year, month, day) => {
  return Boolean(year && month && day);
};

export const isTitle = (title) => {
  const titleRegex = new RegExp('^.{5,50}$');
  return titleRegex.test(title);
};

export const isPrice = (price) => {
  const priceRegex = new RegExp('^[1-9]\\d*$');
  return priceRegex.test(price);
};

export const isContent = (content) => {
  // const contentRegex = new RegExp('^.{1,500}$');
  const contentRegex = new RegExp('^(.|\\n){1,500}$');
  return contentRegex.test(content);
};

export const isDetailLocation = (detailLocation) => {
  const detailLocationRegex = new RegExp('^.{5,60}$');
  return detailLocationRegex.test(detailLocation);
};
