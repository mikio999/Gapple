'use client';

import React, { useState } from 'react';
import { SelectInput } from './SelectInput';
import { BaseInput } from './BaseInput';
import { ActivityTypeSelector } from './ActiveTypeSelector';
import { TextAreaInput } from './TextAreaInput';
import CurriculumToggle from './CurriculumToggle';
import AgeSelect from './AgeSelect';

export default function FormPage() {
  const [groupSize, setGroupSize] = useState('');
  const [activityName, setActivityName] = useState('');
  const [subject, setSubject] = useState('');
  const [activityType, setActivityType] = useState('');
  const [goals, setGoals] = useState(['', '']);
  const [contents, setContents] = useState([{ subtitle: '', content: '' }]);
  const [notes, setNotes] = useState('');

  const ageOptions = [
    { label: '만 3세', value: '3', image: '/images/age/age3.png' },
    { label: '만 4세', value: '4', image: '/images/age/age4.png' },
    { label: '만 5세', value: '5', image: '/images/age/age5.png' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'small' },
    { label: '중집단', value: 'medium' },
    { label: '대집단', value: 'large' },
  ];

  const handleAgeSelect = (value: string) => {
    console.log(`선택된 나이: 만 ${value}세`);
  };

  const handleGoalsChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const handleContentsChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newContents = contents.map((content, i) => {
      if (i === index) {
        return { ...content, [field]: value };
      }
      return content;
    });
    setContents(newContents);
  };

  const addContent = () => {
    setContents([...contents, { subtitle: '', content: '' }]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={'container mx-auto px-4'}>
      <h1 className={'text-xl px-4 font-maple text-gray700 '}>
        {'직접 계획안 글쓰기'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-2 flex flex-col'
        }
      >
        <div>
          <input
            type="text"
            name="title"
            className={'text-xl laptop:text-3xl p-2 focus:outline-none'}
            placeholder={'활동명을 입력하세요 '}
          />
          <div className={'ml-2 p-2  w-1/12 '} />
        </div>
        <div className={'p-2 flex flex-col laptop:flex-row'}>
          <input
            placeholder={'주제'}
            name={'subject'}
            className={
              'border-l-4 border-l-slate-500 p-4 w-4/12 focus:outline-none'
            }
          />
          <input
            placeholder={'세부 주제'}
            name={'detail_subject'}
            className={
              'border-l-4 border-l-slate-500 p-4 mt-4 laptop:mt-0  w-4/12 focus:outline-none'
            }
          />
        </div>

        <AgeSelect options={ageOptions} onSelect={handleAgeSelect} />
        <ActivityTypeSelector value={activityType} onChange={setActivityType} />
        {goals.map((goal, index) => (
          <BaseInput
            key={`${index + 1}`}
            label={`활동 목표 ${index + 1}`}
            id={`goal-${index}`}
            value={goal}
            onChange={(value) => handleGoalsChange(index, value)}
          />
        ))}
        <CurriculumToggle />
        <label
          htmlFor={'activity-resource'}
          className={'block text-sm font-medium text-gray-700'}
        >
          {'활동 자료'}
        </label>
        <input
          id={'activity-resource'}
          type={'file'}
          aria-label={'활동 자료 파일 업로드'}
          aria-describedby={'file-upload-description'}
          className={
            'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          }
        />
        <div id={'file-upload-description'} className={'text-sm text-gray-500'}>
          {'업로드할 파일을 선택하세요.'}
        </div>
        {contents.map((content, index) => (
          <div key={`${index + 1}`} className={'flex flex-col'}>
            <BaseInput
              label={`소제목 ${index + 1}`}
              id={`subtitle-${index}`}
              value={content.subtitle}
              onChange={(value) =>
                handleContentsChange(index, 'subtitle', value)
              }
            />
            <TextAreaInput
              label={'세부내용'}
              id={`content-${index}`}
              value={content.content}
              onChange={(value) =>
                handleContentsChange(index, 'content', value)
              }
            />
          </div>
        ))}
        <div className={'flex justify-center'}>
          <button
            type={'button'}
            onClick={addContent}
            className={
              'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary w-12 h-12'
            }
          >
            {'+'}
          </button>
        </div>
        <TextAreaInput
          label={'유의사항 및 평가'}
          id={'notes'}
          value={notes}
          onChange={setNotes}
        />
        <button
          type={'submit'}
          className={
            'button-border py-2 px-4 bg-primary text-white rounded hover:bg-white hover:text-primary'
          }
        >
          {'저장하기'}
        </button>
      </form>
    </div>
  );
}
