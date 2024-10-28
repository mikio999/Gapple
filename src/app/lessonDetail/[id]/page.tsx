import { auth } from '@/auth';
import CommentSection from './_component/commentSection/CommentSection';
import LessonDetails from './_component/lessonDetails/LessonDetails';
import { getPlanners } from '../_lib/getPlanners';
import Profile from './_component/profileSection/Profile';

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
    <div className={'container mx-auto laptop:px-4 h-dvh]'}>
      <Profile createdAt={planner.data.created_dt} />
      <LessonDetails planner={planner.data} />
      <CommentSection />
    </div>
  );
}
