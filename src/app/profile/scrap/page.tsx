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
      {scrapData.map((item, index) => (
        <ScrapItem
          key={index}
          title={item.title}
          description={item.description}
          likedBy={item.likedBy}
        />
      ))}
    </div>
  );
}
