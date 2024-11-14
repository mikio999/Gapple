'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

interface RecordSwiperProps {
  images: string[];
}

const RecordSwiper = ({ images }: RecordSwiperProps) => {
  return (
    <Swiper
      cssMode
      navigation
      pagination
      mousewheel
      keyboard
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={'mySwiper'}
      style={{ objectFit: 'contain' }}
    >
      {images?.map((img: string) => (
        <SwiperSlide key={uuidv4()}>
          <div
            className={
              'flex justify-center items-center h-72 w-72 mr-auto ml-auto'
            }
          >
            <Image src={img} width={640} height={360} alt={'Record image'} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecordSwiper;
