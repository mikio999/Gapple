import NaverLogin from './_component/NaverLogin';
import Image from 'next/image';
import TypingTop from './_component/TypingTop';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div
        className="p-6 rounded-lg shadow-lg bg-white"
        style={{ marginTop: '-150px' }}
      >
        <TypingTop />
        <Image
          src={'/images/gappler.png'}
          width={200}
          height={50}
          alt={'logo'}
          priority
        />

        <div className="text-center mt-4 font-pretendard text-gray-600">
          <span className="font-maple text-[#ED4264]">GA:Pl</span>에서는 별도의
          가입 절차 없이 <br />
          간편하게 네이버 로그인하세요!
        </div>
        <div className="mt-6">
          <NaverLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
