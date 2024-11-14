import React from 'react';
import { IFeed } from '@/types/feed';
import ImageCarousel from './ImageCarousel';

interface LogProps {
  log: IFeed;
}

const LogFeed = ({ log }: LogProps) => {
  return (
    <div className={'p-4'}>
      {log.images && log.images.length > 0 && (
        <div className={'px-4 py-0 border-t z-10'}>
          <ImageCarousel images={log.images} />
        </div>
      )}
      <div>{log.content}</div>
      <div>{log.subject}</div>
      <div>{log.activity_type}</div>
    </div>
  );
};

export default LogFeed;
