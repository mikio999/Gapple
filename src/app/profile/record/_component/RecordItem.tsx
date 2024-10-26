'use client';

import React from 'react';
import Image from 'next/image';
import CustomItem from '../../_component/CustomItem';
import RecordSwiper from './RecordSwiper';

interface RecordItemProps {
  item: {
    id: number;
    images: string[];
    activity_type: string;
    subject: string;
    description: string;
    comment: number;
    like: number;
    scrap: number;
  };
}

const RecordItem = ({ item }: RecordItemProps) => {
  console.log(item);
  if (!item || !item.images) {
    return null;
  }

  return (
    <CustomItem>
      <RecordSwiper images={item.images} />
      <div className={'p-4'}>
        <div className={'text-sm'}>{item.description}</div>
        <div className={'flex text-xs items-center justify-between mt-2'}>
          <div className={'flex space-x-2'}>
            <Image
              src={'/icons/heart.png'}
              width={15}
              height={15}
              alt={'Like'}
            />
            <span>{item.like}</span>
            <Image
              src={'/icons/comment.png'}
              width={15}
              height={15}
              alt={'Comment'}
            />
            <span>{item.comment}</span>
          </div>
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
              alt={'Star'}
            />
            <span>{item.scrap}</span>
          </button>
        </div>
      </div>
    </CustomItem>
  );
};

export default RecordItem;
