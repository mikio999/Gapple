import { useCallback, useState } from 'react';
import { BasicQuestionProps, Option } from '@/types/ai';
import { activity } from '@/_lib/constants/activity';
import TypingEffect from '../motion/TypingEffect';
import OptionSelector from '../motion/OptionSelector';

const SecondQuestion = ({
  currentStep,
  setCurrentStep,
  questions,
  questionKeys,
}: BasicQuestionProps) => {
  const options = { activity };

  const handleOptionSelect = () => {
    setCurrentStep(currentStep + 1);
  };

  const currentKey = questionKeys[currentStep - 6];
  const currentOptions = options[currentKey];

  const handleRecommendOtherActivity = () => {
    console.log('다른 활동 추천 로직 실행');
    console.log();
  };

  return (
    <div className={'flex flex-col items-center'}>
      <TypingEffect text={questions[currentKey]} />
      {currentOptions && currentOptions.length > 0 && (
        <OptionSelector
          options={currentOptions}
          onOptionSelect={handleOptionSelect}
          questionKey={currentKey}
          onRecommendOtherActivity={handleRecommendOtherActivity}
        />
      )}
    </div>
  );
};

export default SecondQuestion;
