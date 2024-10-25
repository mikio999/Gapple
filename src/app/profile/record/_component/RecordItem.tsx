import CustomItem from '../../_component/CustomItem';

interface RecordItemProps {
  title: string;
  date: string;
  details: string;
  duration: string;
}

const RecordItem = ({ title, date, details, duration }: RecordItemProps) => {
  return (
    <CustomItem>
      <div className={'flex justify-between items-center mb-2'}>
        <h2 className={'text-lg font-bold'}>{title}</h2>
        <span className={'text-xs text-slate-400'}>{date}</span>
      </div>
      <p className={'text-sm text-gray-700 mb-2'}>{details}</p>
      <span className={'text-xs text-slate-500'}>
        {'Duration: '}
        {duration}
      </span>
    </CustomItem>
  );
};

export default RecordItem;
