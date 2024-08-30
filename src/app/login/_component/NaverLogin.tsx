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
      <button type="submit" className="button-effect">
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
