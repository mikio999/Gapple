import Image from 'next/image';
import { signIn } from '@/auth';

export default function LoginButton() {
  return (
    <form
      className="flex justify-center items-center"
      action={async () => {
        'use server';
        await signIn('naver', { redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        <Image
          src={'/images/loginBtnWhite.png'}
          width={200}
          height={50}
          alt={'login'}
          priority
        />
      </button>
    </form>
  );
}
