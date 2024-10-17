import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { category } from '@/_lib/constants/category';
import { age } from '@/_lib/constants/age';
import { groupSize } from '@/_lib/constants/groupSize';
import { theme } from '@/_lib/constants/theme';
import { recommendation } from '@/_lib/constants/recommendation';
import TypingEffect from '../motion/TypingEffect';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import AnswerDisplay from './AnswerDisplay';
import AIActionDisplay from './AIActionDisplay';
import { Options, Option, BasicQuestionProps } from '@/types/ai';

const BasicQuestion = ({
  currentStep,
  setCurrentStep,
  questions,
  questionKeys,
}: BasicQuestionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const options = { age, groupSize, theme, category, recommendation };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
  );

  const handleNextStep = () => {
    const key = questionKeys[currentStep - 1];
    setAnswers((prev) => ({
      ...prev,
      [key]: inputValue,
    }));
    setInputValue('');
    if (currentStep < questionKeys.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (option: Option) => {
    const key = questionKeys[currentStep - 1];
    setAnswers((prev) => ({
      ...prev,
      [key]: option.value,
    }));
    setCurrentStep(currentStep + 1);
  };

  const handleEditAnswer = (index: number) => {
    const key = questionKeys[index];
    setCurrentStep(index + 1);
    setInputValue(answers[key]);
  };

  const currentKey = questionKeys[currentStep - 1] as keyof Options;
  const currentOptions = options[currentKey];
  const hasImages = currentOptions.some((option: Option) => option.image);

  const areAllQuestionsAnswered =
    questionKeys.length === Object.keys(answers).length + 1;

  console.log('AAQA', areAllQuestionsAnswered);
  console.log(questionKeys.length);
  console.log(Object.keys(answers).length - 1);
  return (
    <div className={'flex flex-col items-center'}>
      <TypingEffect text={questions[questionKeys[currentStep - 1]]} />
      <div className={'mt-4'}>
        {!hasImages && (
          <div className={'flex m-4'}>
            <InputField
              value={inputValue}
              onChange={handleInputChange}
              placeholder={'직접 쓰기'}
            />
            <SubmitButton onClick={handleNextStep} label={'등록'} />
          </div>
        )}

        <div
          className={`${
            currentOptions.length > 2
              ? 'grid grid-cols-4 gap-x-0.5'
              : 'flex justify-center'
          } laptop:grid laptop:grid-cols-4 gap-4 options-container`}
        >
          {currentOptions.map((option: Option) => (
            <button
              type={'button'}
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
                    className={'mb-2'}
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
      <AnswerDisplay
        answers={answers}
        questions={questions}
        onEditAnswer={handleEditAnswer}
      />
      {areAllQuestionsAnswered && (
        <AIActionDisplay onGenerateAI={() => console.log('AI 생성하기')} />
      )}
    </div>
  );
};

export default BasicQuestion;
