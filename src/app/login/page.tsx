import NaverLogin from './_component/NaverLogin';

const LoginPage = () => {
  return (
    <div>
      <h1>로그인</h1>
      <div>별도의 가입 절차 없이 간편하게 네이버 로그인하세요!</div>
      <NaverLogin />
    </div>
  );
};

export default LoginPage;
