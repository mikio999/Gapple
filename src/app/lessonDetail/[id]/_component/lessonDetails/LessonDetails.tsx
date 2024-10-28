import React from 'react';
import Image from 'next/image';
import { IPlanner } from '@/types/plan';
import ActivityContent from './ActivityContent';
import ActivityTool from './ActivityTools';
import BasicInfo from './BasicInfo';
import Evaluation from './Evaluation';
import GoalTable from './GoalTable';
import Precaution from './Precaution';
import NuriCurriculum from './NurriCurriculum';

const LessonDetails = ({ planner }: { planner: IPlanner }) => {
  return (
    <div className={'bg-white py-4 px-6 shadow rounded-lg'}>
      <div className={'my-4'}>
        <h1 className={'text-3xl font-bold'}>{planner.class_plan.title}</h1>
      </div>
      <BasicInfo
        subject={planner.class_plan.subject}
        detailSubject={planner.class_plan.detail_subject}
        activityType={planner.class_plan.activity_type}
      />
      <GoalTable title={'활동 목표'}>
        {planner.class_plan.activity_goal.map((goal) => (
          <div key={goal} className={'flex py-2'}>
            <Image
              src={'/icons/idea.png'}
              width={20}
              height={20}
              alt={'subject'}
              className={'h-5 w-5 mr-2 text-slate-700'}
              mr-2
            />
            {goal}
          </div>
        ))}
      </GoalTable>
      <NuriCurriculum curriculum={planner.class_plan.nuri_curriculum} />
      <div className={'flex justify-between my-4'}>
        <ActivityTool tools={planner.class_plan.activity_tool} />
      </div>
      <ActivityContent contents={planner.class_plan.activity_content} />
      <Precaution precautions={planner.class_plan.precautions} />
      <Evaluation evaluations={planner.class_plan.evaluation_criteria} />
      <div className={'my-4'}>
        <h2 className={'text-lg font-semibold'}>{'첨부파일'}</h2>
        <div className={'flex flex-wrap gap-2'}>
          {planner.class_plan.attachments.map((attachment) => (
            <a
              key={attachment.fileName}
              href={attachment.url}
              target={'_blank'}
              rel={'noopener noreferrer'}
              className={
                'bg-blue-100 hover:bg-blue-200 rounded p-2 text-blue-800'
              }
            >
              {attachment.fileName}
            </a>
          ))}
        </div>
      </div>
      <div className={'my-4'}>
        <h2 className={'text-lg font-semibold'}>{'이미지'}</h2>
        <div className={'grid grid-cols-3 gap-4'}>
          {planner.class_plan.images.map((image) => (
            <div key={image} className={'w-full'}>
              <Image
                width={100}
                height={100}
                src={image}
                alt={'Activity Image'}
                className={'w-full h-full object-cover rounded'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
