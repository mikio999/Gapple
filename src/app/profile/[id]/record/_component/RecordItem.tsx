'use client';

import React from 'react';
import CustomItem from '@/_component/Item/CustomItem';
import ActionButtons from '@/_component/Item/ActionButtons';
import RecordSwiper from './RecordSwiper';

interface RecordItemProps {
  item: any;
}

const RecordItem = ({ item }: RecordItemProps) => {
  if (!item || !item.images) {
    return null;
  }

  return (
    <CustomItem>
      <RecordSwiper images={item.images} />
      <div className={'p-4'}>
        <div className={'text-sm'}>{item.description}</div>
        <ActionButtons
          like={4}
          comment={2}
          scrap={20}
          isLiked={false}
          isBookmarked={false}
          postId={0}
        />
      </div>
    </CustomItem>
  );
};

export default RecordItem;
