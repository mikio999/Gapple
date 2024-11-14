import React from 'react';
import Image from 'next/image';

interface imagePreviewProps {
  src: string;
  alt: string;
  onRemove: () => void;
}
const ImagePreview = React.memo(({ src, alt, onRemove }: imagePreviewProps) => {
  return (
    <div className={'relative'}>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className={'object-contain'}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
      <button
        type={'button'}
        onClick={onRemove}
        className={'absolute top-0 right-0 bg-red-500 text-white p-1'}
      >
        {'✕'}
      </button>
    </div>
  );
});

export default ImagePreview;
