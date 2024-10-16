'use client';

import { useState } from 'react';
import BlinkImage from './motion/BlinkImage';
import Start from './first/Start';
import BasicQuestion from './first/BasicQuestion';

const EntryComponent = () => {
  const [showNextStep, setShowNextStep] = useState(false);

  const handleProceed = () => {
    setShowNextStep(true);
  };

  return (
    <div className={'w-full mt-12'}>
      <div className={'flex items-center'}>
        <BlinkImage
          src={'/images/aitalk/talk1.png'}
          width={50}
          height={50}
          alt={'talk logo'}
        />
      </div>
      {!showNextStep ? <Start onProceed={handleProceed} /> : <BasicQuestion />}
    </div>
  );
};

export default EntryComponent;
