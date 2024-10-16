'use client';

import React, { useState } from 'react';
import TypingEffect from '../motion/TypingEffect';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';

const BasicQuestion = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = [
    '몇 세를 대상으로 한 수업인가요?',
    '집단의 크기는 어느 정도로 예상하시나요?',
    '어떤 주제를 생각하고 계신가요?',
    '어떤 활동유형을 생각하고 계신가요?',
  ];

  const questionKeys = ['age', 'groupSize', 'theme', 'category'];

  const handleNextStep = () => {
    if (inputValue) {
      setAnswers((prev) => ({
        ...prev,
        [questionKeys[currentStep]]: inputValue,
      }));

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        sendToBackend();
      }

      setInputValue('');
    }
  };

  const sendToBackend = async () => {
    try {
      console.log('Sending data to backend:', answers);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className={'h-dvh flex flex-col justify-center items-center'}>
      <TypingEffect text={questions[currentStep]} />
      <div className={'mt-4'}>
        <InputField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={'답변을 입력해주세요'}
        />
        <SubmitButton onClick={handleNextStep} label={'전송'} />
      </div>
    </div>
  );
};

export default BasicQuestion;
