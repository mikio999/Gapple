'use client';

import React, { useState, useEffect } from 'react';

import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Start from './Start';
import Age from './Age';
import Group from './Group';
import Theme from './Theme';
import Category from './Category';

const FirstStep = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [inputValue, setInputValue] = useState('');
  const age = 5;

  useEffect(() => {
    if (currentStep === 'start') {
      const timer = setTimeout(() => {
        setCurrentStep('age');
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 'age' && inputValue) {
      setCurrentStep('group');
    } else if (currentStep === 'group' && inputValue) {
      setCurrentStep('theme');
    } else if (currentStep === 'theme' && inputValue) {
      setCurrentStep('category');
    }
    setInputValue('');
  };

  return (
    <div>
      <h1>{'Ai 생성기 페이지'}</h1>
      {currentStep === 'start' && <Start />}
      {currentStep === 'age' && <Age />}
      {currentStep === 'group' && <Group />}
      {currentStep === 'theme' && <Theme age={age} />}
      {currentStep === 'category' && <Category />}
      {currentStep !== 'start' && (
        <div>
          <InputField
            value={inputValue}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setInputValue(e.target.value)}
            placeholder={'답장'}
          />
          <SubmitButton onClick={handleNextStep} label={'전송'} />
        </div>
      )}
    </div>
  );
};

export default FirstStep;
