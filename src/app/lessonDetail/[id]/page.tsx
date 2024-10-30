import { auth } from '@/auth';
import CommentSection from './_component/commentSection/CommentSection';
import LessonDetails from './_component/lessonDetails/LessonDetails';
import { getPlanners } from '../_lib/getPlanners';
import Profile from './_component/profileSection/Profile';
import ButtonSection from './_component/buttonSection/ButtonSection';

interface Session {
  accessToken: string;
}

export default async function LessonPage({
  params,
}: {
  params: { id: string };
}) {
  const session: Session | null = await auth();

  if (!session) {
    console.error('No session available, user might not be logged in');
    return <div>{'유저 정보가 존재하지 않습니다'}</div>;
  }

  const planner = await getPlanners(params.id, session.accessToken);

  return (
    <div className={'container mx-auto desktop:px-28 h-dvh]'}>
      <div className={'flex justify-between'}>
        <Profile createdAt={planner.data.created_dt} />
        <div
          className={
            'desktop:fixed desktop:top-36 desktop:left-48 hidden laptop:block'
          }
        >
          <ButtonSection />
        </div>
      </div>
      <LessonDetails planner={planner.data} />
      <div className={'ml-auto laptop:hidden w-36 my-4'}>
        <ButtonSection />
      </div>
      <CommentSection
        postId={planner.data.document_id}
        accessToken={session.accessToken}
      />
    </div>
  );
}
