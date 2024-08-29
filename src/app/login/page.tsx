import NaverLogin from './_component/NaverLogin';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={'/images/GappleLogo.png'}
        width={200}
        height={50}
        alt={'logo'}
        priority
      />
      <h1 style={{ fontFamily: 'maple' }}>로그인</h1>
      <div>별도의 가입 절차 없이 간편하게 네이버 로그인하세요!</div>
      <NaverLogin />
    </div>
  );
};

export default LoginPage;
