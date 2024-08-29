import Image from 'next/image';

export default function LoginButton() {
  return (
    <div className="flex justify-center items-center">
      <div className="transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer">
        <Image
          src={'/images/loginBtnWhite.png'}
          width={200}
          height={50}
          alt={'login'}
          priority
        />
      </div>
    </div>
  );
}
