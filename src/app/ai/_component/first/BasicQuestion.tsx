import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { category } from '@/_lib/constants/category';
import { age } from '@/_lib/constants/age';
import { groupSize } from '@/_lib/constants/groupSize';
import { theme } from '@/_lib/constants/theme';
import TypingEffect from '../motion/TypingEffect';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';

interface Option {
  name: string;
  value: string;
  image?: string;
}

interface Options {
  age: Option[];
  groupSize: Option[];
  theme: Option[];
  category: Option[];
  [key: string]: Option[];
}

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
  const options: Options = { age, groupSize, theme, category };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const handleNextStep = () => {
    setAnswers((prev) => ({
      ...prev,
      [questionKeys[currentStep]]: inputValue,
    }));
    setInputValue('');
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sendToBackend();
    }
  };

  const handleOptionSelect = (option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKeys[currentStep]]: option.value,
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sendToBackend();
    }
  };

  const sendToBackend = async () => {
    try {
      console.log('Sending data to backend:', answers);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleEditAnswer = (index: number) => {
    const key = questionKeys[index];
    const value = answers[key];
    setCurrentStep(index);
    setInputValue(value);
  };

  const currentQuestionKey = questionKeys[currentStep];
  const currentOptions = options[currentQuestionKey];
  const hasImages = currentOptions.some((option) => option.image);

  return (
    <div className={'flex flex-col items-center'}>
      <TypingEffect text={questions[currentStep]} />
      <div className={'mt-4'}>
        {!hasImages && (
          <>
            <InputField
              value={inputValue}
              onChange={handleInputChange}
              placeholder="답변을 입력해주세요"
            />
            <SubmitButton onClick={handleNextStep} label="등록" />
          </>
        )}
        <div
          className={`${hasImages ? 'grid grid-cols-4 gap-x-0.5 laptop:grid laptop:grid-cols-4' : 'grid grid-cols-3 laptop:grid-cols-4'} gap-4 options-container`}
        >
          {currentOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className={
                'option-button m-1 p-1 laptop:m-2 laptop:p-2 border rounded flex flex-col items-center button-effect bg-white'
              }
            >
              {option.image ? (
                <>
                  <Image
                    width={100}
                    height={100}
                    src={option.image}
                    alt={option.name}
                    className="mb-2"
                  />
                  <span className={'text-xs laptop:text-base'}>
                    {option.name}
                  </span>
                </>
              ) : (
                <div>{option.name}</div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="answers-list mt-4 mb-16">
        {Object.entries(answers).map(([key, value], index) => (
          <div
            key={key}
            onClick={() => handleEditAnswer(index)}
            style={{ cursor: 'pointer' }}
          >
            <strong>{questions[index]}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicQuestion;
