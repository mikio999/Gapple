'use client';

import { useSession } from 'next-auth/react';

function Start() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>{'로그인을 해주세요.'}</div>;
  }
  return (
    <div>
      <div>{'반가워요 :) 봄날의 햇살 같은'}</div>
      <span className={'text-slate-700 font-bold'}>{session.user.name}</span>
      {'쌤!'}
    </div>
  );
}

export default Start;
