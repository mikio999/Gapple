import React, { useState } from 'react';

interface AgeOptionProps {
  label: string;
  value: string;
  image: string;
}

interface AgeSelectorProps {
  options: AgeOptionProps[];
  onSelect: (value: string) => void;
}

const AgeSelect = ({ options, onSelect }: AgeSelectorProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>('3');

  const handleAgeClick = (value: string) => {
    onSelect(value);
    setSelectedValue(value);
  };

  return (
    <>
      <h1 className={'text-slate-500'}>연령 선택</h1>
      <div className={'flex justify-center items-center'}>
        <div className={'grid grid-cols-3 gap-x-3'}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAgeClick(option.value)}
              className={`focus:outline-none bg-transparent border-4 transition duration-300 ease-in-out 
                         ${option.value === selectedValue ? 'border-primary300' : 'hover:border-gray-300 border-transparent'}`}
            >
              <img
                src={option.image}
                alt={`만 ${option.value}세`}
                className="w-28 h-28"
              />
              <div className={'text-slate-700'}>{option.label}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AgeSelect;
