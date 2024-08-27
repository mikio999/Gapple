import Image from 'next/image';

export default function NaverLogin() {
  return (
    <div>
      <Image
        src={'/images/loginBtn.png'}
        alt={'로그인 버튼'}
        width={100}
        height={100}
      />
    </div>
  );
}
