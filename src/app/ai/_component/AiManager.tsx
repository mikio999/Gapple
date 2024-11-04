'use client';

import React, { useState, useCallback } from 'react';

import {
  ageQuestion,
  groupSizeQuestion,
  subjectQuestion,
  activityTypeQuestion,
} from '@/_lib/constants/aiQuestionList';
import TypingEffect from './motion/TypingEffect';
import OptionSelector from './motion/OptionSelector';
import { IOption, ISelectedAnswers } from '@/types/aiOption';
import { useSession } from 'next-auth/react';
import { useAi } from '../_lib/useAi';

const questions = [
  ageQuestion,
  groupSizeQuestion,
  subjectQuestion,
  activityTypeQuestion,
];

const AiManager = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<ISelectedAnswers>({
    age: 0,
    activityType: '',
    subject: '',
    groupSize: '',
  });
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [recommendSubject, setRecommendSubject] = useState({});

  const { addSubject } = useAi(accessToken!, 1, 1);
  console.log(selectedAnswers);
  const handleOptionSelect = useCallback(
    (option: IOption) => {
      const currentQuestion = questions[currentStep];

      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.field]: option.value,
      }));

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log('All questions answered:', selectedAnswers);
      }
    },
    [currentStep, selectedAnswers],
  );

  const handleCustomSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomSubject(e.target.value);
  };

  const handleCustomSubjectSubmit = () => {
    setSelectedAnswers((prev) => ({
      ...prev,
      subject: customSubject,
    }));
    setCurrentStep(currentStep + 1);
  };

  function isCompleteAnswers(answers: ISelectedAnswers): answers is {
    age: number;
    groupSize: string;
    subject: string;
    activityType: string;
  } {
    return (
      answers.age !== 0 &&
      answers.groupSize.length > 0 &&
      answers.subject.length > 0 &&
      answers.activityType.length > 0
    );
  }

  const { question, options, field } = questions[currentStep];

  const handleGenerateAI = async () => {
    if (accessToken && isCompleteAnswers(selectedAnswers)) {
      setLoading(true);
      console.log('initiate ai...');
      try {
        const postResult = await addSubject(selectedAnswers);
        setRecommendSubject(postResult);
        console.log('AI generation initiated.');
      } catch (error) {
        console.error('Failed to generate AI:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Missing required information or access token');
    }
  };
  console.log('======rs======');
  console.log(recommendSubject);

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <TypingEffect text={question} />
      {field === 'subject' ? (
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center justify-center my-2">
            <input
              type="text"
              value={customSubject}
              onChange={handleCustomSubjectChange}
              placeholder="직접 주제를 입력하세요"
              className="flex items-center justify-center  py-2 px-4 h-10 border border-gray-300 rounded"
            />
            <button
              className={`flex items-center justify-center py-2 px-4 h-10 bg-blue-500 text-white rounded transition duration-300 ${
                customSubject
                  ? 'hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={handleCustomSubjectSubmit}
              disabled={!customSubject}
            >
              등록
            </button>
          </div>
          <OptionSelector
            options={options}
            onOptionSelect={handleOptionSelect}
            hasImages={options.some((opt) => 'image' in opt)}
          />
        </div>
      ) : (
        <OptionSelector
          options={options}
          onOptionSelect={handleOptionSelect}
          hasImages={options.some((opt) => 'image' in opt)}
        />
      )}
      {isCompleteAnswers(selectedAnswers) && (
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          onClick={handleGenerateAI}
        >
          Generate AI
        </button>
      )}
    </div>
  );
};

export default AiManager;
