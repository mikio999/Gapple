'use client';

import React, { useState } from 'react';
import { BaseInput } from './BaseInput';
import CategorySelect from './CategorySelect';
import { TextAreaInput } from './TextAreaInput';
import CurriculumToggle from './CurriculumToggle';
import { category } from '@/_lib/constants/category';
import AgeSelect from './AgeSelect';
import GroupSelect from './GroupSelect';
import GoalsInput from './GoalsInput';
import { useCurriculumHandlers } from '@/_lib/hooks/useNurriCurriculum';
import Image from 'next/image';

export default function FormPage() {
  const [goals, setGoals] = useState(['', '']);
  const [contents, setContents] = useState([{ subtitle: '', content: '' }]);
  const [notes, setNotes] = useState('');
  const initialState = [
    { selectedNurri: '', selectedSubNurri: '', selectedCurriculum: '' },
  ];
  const {
    curriculumComponents,
    handleNurriClick,
    handleSubNurriClick,
    handleDetailClick,
    addCurriculumComponent,
    removeCurriculumComponent,
  } = useCurriculumHandlers(initialState);
  console.log(curriculumComponents);

  const ageOptions = [
    { label: '만 3세', value: '3', image: '/images/age/age3.png' },
    { label: '만 4세', value: '4', image: '/images/age/age4.png' },
    { label: '만 5세', value: '5', image: '/images/age/age5.png' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'small', image: '/images/group/small.png' },
    { label: '중집단', value: 'medium', image: '/images/group/medium.png' },
    { label: '대집단', value: 'large', image: '/images/group/large.png' },
  ];

  const handleAgeSelect = (value: string) => {
    console.log(`선택된 나이: 만 ${value}세`);
  };

  const handleGroupSelect = (value: string) => {
    console.log(`선택된 집단: ${value}`);
  };

  const handleCategorySelect = (value: string) => {
    console.log(`선택된 카테고리: ${value}`);
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
    <div className={'container mx-auto '}>
      <form
        onSubmit={handleSubmit}
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-2 flex flex-col'
        }
      >
        <div>
          <input
            type={'text'}
            name={'title'}
            className={'text-xl laptop:text-3xl focus:outline-none'}
            placeholder={'활동명을 입력하세요 '}
          />
          <div className={'ml-2 p-2  w-1/12 '} />
        </div>
        <div className={'flex flex-col laptop:flex-row'}>
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
        <GroupSelect options={groupSizeOptions} onSelect={handleGroupSelect} />
        <CategorySelect options={category} onSelect={handleCategorySelect} />
        <GoalsInput goals={goals} setGoals={setGoals} />
        <div>
          <h1 className={'title-effect'}>{'누리과정 관련요소'}</h1>
        </div>
        {curriculumComponents.map(
          (
            component: { selectedNurri: string; selectedSubNurri: string },
            index: React.Key,
          ) => (
            <div key={index}>
              <div
                className={
                  'flex justify-between text-lg text-slate-400 border-b'
                }
              >
                누리과정 요소 {typeof index === 'number' ? index + 1 : null}
                {curriculumComponents.length !== 1 && (
                  <button
                    type="button"
                    className={
                      'flex justify-center items-center rounded-full hover:bg-primary100 w-8 h-8'
                    }
                    onClick={() => removeCurriculumComponent(index)}
                  >
                    <Image
                      src={'/icons/deletetrash.png'}
                      width={16}
                      height={16}
                      alt={'delete'}
                    />
                  </button>
                )}
              </div>
              <CurriculumToggle
                selectedNurri={component.selectedNurri}
                onNurriClick={(nurri) => handleNurriClick(index, nurri)}
                selectedSubNurri={component.selectedSubNurri}
                onSubNurriClick={(subNurri, event) =>
                  handleSubNurriClick(index, subNurri, event)
                }
                onDetailClick={(detail) => handleDetailClick(index, detail)}
              />
            </div>
          ),
        )}
        {curriculumComponents.length < 3 && (
          <button
            type="button"
            className={
              'mt-2 bg-primary400 hover:bg-primary text-white font-thin py-2 px-4 rounded'
            }
            onClick={addCurriculumComponent}
          >
            누리과정 요소 추가
          </button>
        )}

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
