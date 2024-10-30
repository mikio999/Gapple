'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { category } from '@/_lib/constants/category';
import { useCurriculumHandlers } from '@/_lib/hooks/useNurriCurriculum';
import CategorySelect from './select/CategorySelect';
import AgeSelect from './select/AgeSelect';
import GroupSelect from './select/GroupSelect';
import CurriculumSection from './nurriCurriculum/CurriculumSection';
import SubjectInputSection from './section/SubjectInputSelection';
import ContentSection from './nurriCurriculum/ContentSection';
import GoalsSection from './section/GoalsSection';
import PrecautionsSection from './section/PrecautionSection';
import EvaluationsSection from './section/EvaluationSection';
import FileUploadSection from './section/FileUploadSection';
import ToolSection from './section/ToolSection';
import submitLessonForm from '../_lib/api';
import SaveButtons from './section/SaveButtonsSection';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [detailSubject, setDetailSubject] = useState('');
  const initialContents = [{ id: uuidv4(), subtitle: '', contents: [''] }];
  const [contents, setContents] = useState(initialContents);
  const initialGoals = [{ id: '', text: '' }];
  const [goals, setGoals] = useState(initialGoals);
  const [tools, setTools] = useState([{ id: '1', value: '' }]);
  const initialPrecautions = [{ id: '', text: '' }];
  const [precautions, setPrecautions] = useState(initialPrecautions);
  const initialEvaluations = [{ id: '', text: '' }];
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [age, setAge] = useState(3);
  const [groupSize, setGroupSize] = useState('SMALL');
  const [activityType, setActivityType] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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

  const ageOptions = [
    { label: '만 3세', value: 3, image: '/images/age/age3.png' },
    { label: '만 4세', value: 4, image: '/images/age/age4.png' },
    { label: '만 5세', value: 5, image: '/images/age/age5.png' },
  ];

  const groupSizeOptions = [
    { label: '소집단', value: 'SMALL', image: '/images/group/small.png' },
    { label: '중집단', value: 'MEDIUM', image: '/images/group/medium.png' },
    { label: '대집단', value: 'LARGE', image: '/images/group/large.png' },
  ];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const handleDetailSubjectChange = (value: string) => {
    setDetailSubject(value);
  };

  const handleAgeSelect = (value: number) => {
    setAge(value);
  };

  const handleGroupSelect = (value: string) => {
    setGroupSize(value);
  };

  const handleCategorySelect = (value: string) => {
    setActivityType(value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSaving(true);
    const formData = {
      title,
      subject,
      detail_subject: detailSubject,
      age,
      group_size: groupSize,
      activity_type: activityType,
      activity_goal: goals.map((goal) => goal.text),
      activity_tool: tools.map((tool) => tool.value),
      precautions: precautions.map((precaution) => precaution.text),
      evaluation_criteria: evaluations.map((evaluation) => evaluation.text),
      activity_content: contents.map((content) => ({
        subtitle: content.subtitle,
        content: content.contents.join('\n'),
      })),
      nuri_curriculum: curriculumComponents.map(
        (component: {
          selectedNurri: string;
          selectedSubNurri: string;
          selectedCurriculum: string;
        }) => ({
          main_category: component.selectedNurri,
          sub_category: component.selectedSubNurri,
          content: component.selectedCurriculum,
        }),
      ),
    };

    if (session) {
      try {
        const result = await submitLessonForm(formData, session.accessToken);
        toast.success('계획안 생성 성공!');
        console.log('서버 응답:', result);
      } catch (error) {
        toast.error('계획안 생성 실패!');
        console.error('폼 제출 실패:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleTempSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      toast.success('임시 저장 성공!');
    } catch (error) {
      toast.error('임시 저장 실패!');
      if (error) {
        console.error(error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div
        className={
          'space-y-6 bg-white p-6 rounded-lg shadow-md mt-4 mb-16 laptop:mt-0 laptop:mb-0 flex flex-col w-full max-w-4xl mx-auto'
        }
      >
        <div>
          <input
            type={'text'}
            name={'title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={'text-xl laptop:text-3xl focus:outline-none w-full'}
            placeholder={'활동명을 입력하세요 '}
          />
        </div>
        <SubjectInputSection
          subject={subject}
          detailSubject={detailSubject}
          onSubjectChange={handleSubjectChange}
          onDetailSubjectChange={handleDetailSubjectChange}
        />

        <AgeSelect
          options={ageOptions}
          selectedAge={age}
          onSelect={handleAgeSelect}
        />
        <GroupSelect
          options={groupSizeOptions}
          selectedGroupSize={groupSize}
          onSelect={handleGroupSelect}
        />
        <CategorySelect
          options={category}
          selectedActivityType={activityType}
          onSelect={handleCategorySelect}
        />
        <GoalsSection goals={goals} setGoals={setGoals} />
        <CurriculumSection
          curriculumComponents={curriculumComponents}
          handleNurriClick={handleNurriClick}
          handleSubNurriClick={handleSubNurriClick}
          handleDetailClick={handleDetailClick}
          removeCurriculumComponent={removeCurriculumComponent}
          addCurriculumComponent={addCurriculumComponent}
          canAddMore={curriculumComponents.length < 3}
        />
        <ToolSection tools={tools} setTools={setTools} />
        <FileUploadSection
          id={'activity-resource'}
          label={'활동 자료'}
          description={'업로드할 파일을 드롭하거나 클릭해서 선택하세요.'}
        />
        <ContentSection contents={contents} setContents={setContents} />
        <PrecautionsSection
          precautions={precautions}
          setPrecautions={setPrecautions}
        />
        <EvaluationsSection
          evaluations={evaluations}
          setEvaluations={setEvaluations}
        />
        <SaveButtons
          onSave={handleSubmit}
          onTempSave={handleTempSave}
          isSaving={isSaving}
        />
        <ToastContainer />
      </div>
    </div>
  );
}
