import ActionButtons from '@/_component/Item/ActionButtons';
import CustomItem from '@/_component/Item/CustomItem';
import Image from 'next/image';

interface PlanItemProps {
  title: string;
  description: string;
  date: string;
  comment: number;
  like: number;
  scrap: number;
  object: string;
  subject: string;
  age: number;
  activityType: string;
}

const PlanItem = ({
  title,
  description,
  date,
  object,
  comment,
  like,
  scrap,
  subject,
  age,
  activityType,
}: PlanItemProps) => {
  return (
    <CustomItem>
      <div className={'flex justify-between items-center'}>
        <h2 className={'text-lg font-bold'}>{title}</h2>
        <span className={'text-xs text-slate-400'}>{date}</span>
      </div>
      <div className={'grid grid-cols-[75%_25%] items-center'}>
        <div className={'flex flex-col mb-2'}>
          <div className={'flex'}>
            <span
              className={
                'bg-slate-700 text-white font-thin px-4 rounded-full mr-2 text-sm'
              }
            >
              {age}
              {'세'}
            </span>
            <span
              className={
                'bg-slate-700 text-white font-thin px-4 rounded-full mr-2 text-sm'
              }
            >
              {activityType}
            </span>
            <span
              className={
                'bg-slate-700 text-white font-thin px-4 rounded-full mr-2 text-sm'
              }
            >
              {subject}
            </span>
          </div>
          <p className={'text-sm text-gray-700 whitespace-pre-line mt-2'}>
            {description}
          </p>
        </div>
        <Image
          src={'/images/쿠리만쥬.webp'}
          width={300}
          height={300}
          alt={title}
        />
      </div>
      <div className={'flex items-center py-1 text-blue-500 rounded-md mt-2'}>
        <Image
          src={'/icons/idea.png'}
          width={20}
          height={20}
          alt={'idea'}
          className={'flex justify-center w-4 h-4 mr-1'}
        />
        <div className={'text-sm text-slate-500 font-thin'}>{object}</div>
      </div>
      <ActionButtons
        like={like}
        comment={comment}
        scrap={scrap}
        isLiked={false}
        isBookmarked={false}
        postId={0}
      />
    </CustomItem>
  );
};

export default PlanItem;
