import React, { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { category } from '@/_lib/constants/category';
import { age } from '@/_lib/constants/age';
import { groupSize } from '@/_lib/constants/groupSize';
import { theme } from '@/_lib/constants/theme';
import { recommendation } from '@/_lib/constants/recommendation';
import { Options, Option, BasicQuestionProps } from '@/types/ai';
import TypingEffect from '../motion/TypingEffect';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import AnswerDisplay from './AnswerDisplay';
import AIActionDisplay from './AIActionDisplay';
import OptionSelector from '../motion/OptionSelector';
import { useAi } from '../../_lib/useAi';

const BasicQuestion = ({
  currentStep,
  setCurrentStep,
  questions,
  questionKeys,
  inputValue,
  answers,
  showInput,
  handleInputChange,
  handleNextStep,
  handleOptionSelect,
  handleEditAnswer,
  handleGenerateAI,
}: BasicQuestionProps) => {
  const currentKey = questionKeys[currentStep - 1] as keyof Options;
  console.log(answers);
  const currentOptions = answers[currentKey];
  // const hasImages = currentOptions.some((option: Option) => option.image);

  return (
    <div className={'flex flex-col items-center bg-slate-50'}>
      <TypingEffect text={questions[questionKeys[currentStep - 1]]} />
      <div className={'mt-4'}>
        {/* {showInput && !hasImages && (
          <div className={'flex m-4'}>
            <InputField
              value={inputValue}
              onChange={handleInputChange}
              placeholder={'직접 쓰기'}
            />
            <SubmitButton onClick={handleNextStep} label={'등록'} />
          </div>
        )} */}
        {/* <OptionSelector
          options={currentOptions}
          onOptionSelect={handleOptionSelect}
          hasImages={hasImages}
        /> */}
      </div>
      <AnswerDisplay
        answers={answers}
        questions={questions}
        onEditAnswer={handleEditAnswer}
      />
      {/* {areAllQuestionsAnswered && (
        <AIActionDisplay onGenerateAI={handleGenerateAI} />
      )} */}
    </div>
  );
};

export default BasicQuestion;
