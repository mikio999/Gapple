import { useCallback, useState } from 'react';
import { Option } from '@/types/ai';
import { activity } from '@/_lib/constants/activity';
import TypingEffect from '../motion/TypingEffect';
import OptionSelector from '../motion/OptionSelector';

const SecondQuestion = ({
  currentStep,
  setCurrentStep,
  questions,
  questionKeys,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const options = { activity };

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

  console.log('currentStep:', currentStep);
  console.log('setCurrentStep:', setCurrentStep);
  console.log('questions:', questions);
  console.log('questionKeys:', questionKeys);

  const currentKey = questionKeys[currentStep - 6];
  console.log('currentKey', currentKey);
  const currentOptions = options[currentKey];
  console.log('options', options);
  console.log('currentOptions', currentOptions);

  const handleRecommendOtherActivity = () => {
    console.log('다른 활동 추천 로직 실행');
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
