import Link from 'next/link';

export default function LoginBtn() {
  return (
    <Link
      href="/login"
      className="flex justify-center items-center font-maple text-primary border border-solid button-effect"
      style={{ width: '75px', height: '30px' }}
    >
      로그인
    </Link>
  );
}
