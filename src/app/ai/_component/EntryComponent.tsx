'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Start from './first/Start';
import BasicQuestion from './first/BasicQuestion';
import SecondQuestion from './second/SecondQuestion';

const EntryComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const questions = {
    age: '몇 세를 대상으로 한 수업인가요?',
    groupSize: '집단의 크기는 어느 정도로 예상하시나요?',
    theme: '어떤 주제를 생각하고 계신가요?',
    category: '어떤 활동유형을 생각하고 계신가요?',
    recommendation:
      '해당 주제와 집단크기, 연령, 활동 유형을 기반으로 Gapple에서 활동을 추천해드릴까요?',
  };

  const questionKeys = Object.keys(questions);
  const progress = (currentStep / questionKeys.length) * 100;

  const handleProceed = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className={'w-full mt-12'}>
      <motion.div
        className={'progress-bar bg-primary h-1 w-full mt-2 mb-2'}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      {currentStep === 0 ? (
        <Start onProceed={handleProceed} />
      ) : currentStep <= questionKeys.length ? (
        <BasicQuestion
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          questions={questions}
          questionKeys={questionKeys}
        />
      ) : (
        <SecondQuestion />
      )}
    </div>
  );
};

export default EntryComponent;
