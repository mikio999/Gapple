import React from 'react';

interface NuriCurriculumProps {
  curriculum: { [key: string]: { [subKey: string]: string[] } };
}

const NuriCurriculum = ({ curriculum }: NuriCurriculumProps) => {
  return (
    <div className={'my-4'}>
      <h2 className={'text-lg font-semibold'}>{'누리 교육과정'}</h2>
      <div className={'flex space-x-2'}>
        {Object.entries(curriculum).map(([key, value]) => (
          <div key={key} className={'bg-gray-100 p-4 rounded'}>
            <h3 className={'font-semibold'}>{key}</h3>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey}>
                <h4 className={'text-sm font-semibold'}>{subKey}</h4>
                <ul className={'list-disc pl-5 text-sm'}>
                  {subValue.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NuriCurriculum;
