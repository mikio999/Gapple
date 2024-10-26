import React from 'react';
import RecordItem from './_component/RecordItem';

const RecordPage = () => {
  const recordData = [
    {
      id: 1,
      images: [
        '/images/랏코.webp',
        '/images/우사기.webp',
        '/images/치이카와.webp',
        '/images/ham.jpeg',
      ],
      activity_type: '미술',
      subject: '조개',
      description: '현장학습에서 주워온 조개로 반을 꾸미는 우리반 친구들',
      comment: 12,
      like: 12,
      scrap: 12,
    },
    {
      id: 12,
      images: ['/images/카니.webp', '/images/쿠리만쥬.webp'],
      activity_type: '과학',
      subject: '나뭇잎',
      description:
        '가을 산책을 하며 모은 다양한 나뭇잎으로 과학 활동을 진행해요',
      comment: 12,
      like: 12,
      scrap: 12,
    },
    {
      id: 13,
      images: ['/images/하치와레.webp'],
      activity_type: '체육',
      subject: '줄넘기',
      description: '운동장에서 줄넘기 기술을 배우고 친구들과 함께 연습해봐요',
      comment: 12,
      like: 12,
      scrap: 12,
    },
  ];

  return (
    <div>
      {recordData.map((item) => (
        <RecordItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default RecordPage;
