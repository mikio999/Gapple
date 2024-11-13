'use client';

import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import ChooseCategory from './ChooseCategory';
import DetailsForm from './DetailsForm';
import { useRouter } from 'next/navigation';

export default function RecordModal() {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState('');

  const router = useRouter();

  const handleInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleNextFromPhotos = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
    setStep(2);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setStep(3);
  };

  const handleFormSubmit = (details) => {
    console.log({ photos, category, ...details });
  };

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-85 flex justify-center items-center z-10'
      }
      onClick={router.back}
    >
      <div
        className={
          'flex flex-col bg-slate-100 p-8 rounded-md shadow-md max-w-3xl w-full tablet:w-4/5 laptop:w-3/5 desktop:w-3/5 min-h-96 border-none mx-auto'
        }
        onClick={handleInputClick}
      >
        <div>수업 기록하기</div>
        {step === 1 && <PhotoUpload onNext={handleNextFromPhotos} />}
        {step === 2 && (
          <ChooseCategory onSelectCategory={handleCategorySelect} />
        )}
        {step === 3 && <DetailsForm onSubmit={handleFormSubmit} />}
      </div>
    </div>
  );
}
