import PlanItem from './_component/PlanItem';

const data = [
  {
    title: '고구마 캐기',
    description:
      '고구마밭을 찾아라.\n고구마 밭을 걸어보자. \n땅 속 고구마를 찾아보자. \n고구마 수확 축제 ...',
    object: '고구마에 대해 관심을 가진다.',
    subject: '가을 고구마',
    age: 4,
    activity_type: '게임',
    date: '2024.10.24',
    comment: 12,
    like: 12,
    scrap: 12,
  },
];

export default function PlanPage() {
  return (
    <div>
      {data.map((item, index) => (
        <PlanItem
          key={index}
          title={item.title}
          description={item.description}
          date={item.date}
          comment={item.comment}
          like={item.like}
          scrap={item.scrap}
          object={item.object}
          subject={item.subject}
          age={item.age}
          activityType={item.activity_type}
        />
      ))}
    </div>
  );
}
