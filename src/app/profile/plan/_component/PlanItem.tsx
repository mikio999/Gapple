import Image from 'next/image';
import CustomItem from '../../_component/CustomItem';

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
  comment,
  like,
  scrap,
  object,
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
      <div className={'flex text-xs items-center justify-between mt-2'}>
        <div className={'flex space-x-2'}>
          <button
            type={'button'}
            className={
              'flex items-center space-x-1 text-slate-600 hover:text-red-500'
            }
          >
            <Image
              src={'/icons/heart.png'}
              width={15}
              height={15}
              alt={'heart'}
            />
            <span>{like}</span>
          </button>
          <button
            type={'button'}
            className={
              'flex items-center space-x-1 text-slate-600 hover:text-yellow-500'
            }
          >
            <Image
              src={'/icons/star.png'}
              width={15}
              height={15}
              alt={'star'}
            />
            <span>{scrap}</span>
          </button>
        </div>
        <button
          type={'button'}
          className={
            'flex items-center space-x-1 text-slate-600 hover:text-blue-500'
          }
        >
          <Image
            src={'/icons/comment.png'}
            width={15}
            height={15}
            alt={'comment'}
          />
          <span>{comment}</span>
        </button>
      </div>
    </CustomItem>
  );
};

export default PlanItem;
