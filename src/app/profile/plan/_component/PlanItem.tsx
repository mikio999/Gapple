import Image from 'next/image';

interface PlanItemProps {
  title: string;
  description: string;
  date: string;
  comment: number;
  like: number;
  scrap: number;
}

const PlanItem = ({
  title,
  description,
  date,
  comment,
  like,
  scrap,
}: PlanItemProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <div className="flex items-center justify-start space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
          <Image
            src={'/icons/heart.png'}
            width={20}
            height={20}
            alt={'heart'}
          />
          <span>{like}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500">
          <Image src={'/icons/star.png'} width={20} height={20} alt={'star'} />
          <span>{scrap}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
          <Image
            src={'/icons/comment.png'}
            width={20}
            height={20}
            alt={'comment'}
          />
          <span>{comment}</span>
        </button>
      </div>
    </div>
  );
};

export default PlanItem;
