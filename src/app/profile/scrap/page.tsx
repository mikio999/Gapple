import { v4 as uuidv4 } from 'uuid';
import ScrapItem from './_component/ScrapItem';

export default function ScrapPage() {
  const scrapData = [
    {
      title: 'Scrap Title',
      description: 'Scrap description...',
      likedBy: 20,
    },
  ];

  return (
    <div>
      {scrapData.map((item) => (
        <ScrapItem
          key={uuidv4()}
          title={item.title}
          description={item.description}
          likedBy={item.likedBy}
        />
      ))}
    </div>
  );
}
