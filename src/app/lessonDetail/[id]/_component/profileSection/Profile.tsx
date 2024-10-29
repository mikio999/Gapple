import formatRelativeTime from '@/app/(main)/_lib/formatRelativeTime';

interface ProfileProps {
  createdAt: string;
}

export default function Profile({ createdAt }: ProfileProps) {
  const imageUrl = '/images/카니.webp';
  return (
    <div className={'flex items-center mb-4'}>
      <div
        className={'w-10 h-10 laptop:w-12 laptop:h-12 rounded-full'}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        }}
      />
      <div className={'ml-2'}>
        <strong>{'리얼가이즈'}</strong>
        <span className={'text-slate-600'}>
          {'의'}
          <strong className={'text-primary ml-1'}>{'교육계획안'}</strong>
        </span>
        <div className={'text-slate-500 text-xs'}>
          {formatRelativeTime(createdAt)}
        </div>
      </div>
    </div>
  );
}
