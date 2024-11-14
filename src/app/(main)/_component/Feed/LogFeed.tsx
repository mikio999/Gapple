import React from 'react';
import ImageCarousel from './ImageCarousel';

const LogFeed = ({ log }) => {
  return (
    <div className={'p-4'}>
      {log.images && log.images.length > 0 && (
        <div className={'px-4 py-0 border-t z-10'}>
          <ImageCarousel images={log.images} />
        </div>
      )}
      <div> {log.content}</div>
    </div>
  );
};

export default LogFeed;
