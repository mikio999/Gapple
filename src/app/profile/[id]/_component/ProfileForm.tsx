import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IProfileData } from '@/types/profile';

interface ProfileFormProps {
  profileData: IProfileData;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleImageChange: (imageSrc: string) => void;
}

const ProfileForm = ({
  profileData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}: ProfileFormProps) => {
  const [imagePreview, setImagePreview] = useState(profileData.image);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
          handleImageChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col space-y-4 p-6'}>
      <div className={'flex justify-center items-center'}>
        <div
          className={'relative w-24 h-24 mb-4 hover:cursor-pointer'}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={imagePreview || '/default-profile.jpg'}
            alt={'Profile Picture'}
            layout={'fill'}
            className={`rounded-full object-cover ${isHovering ? 'opacity-50' : 'hover:opacity-80'}`}
          />
          <label
            htmlFor={'file-input'}
            className={
              'absolute inset-0 flex justify-center items-center opacity-0 cursor:pointer'
            }
          >
            {'사진 변경'}
          </label>
          <div
            className={
              'absolute bottom-0 right-0 bg-slate-300 bg-opacity-70 text-white rounded-full p-1 text-xs cursor-pointer'
            }
          >
            <Image
              src={'/icons/pencil.png'}
              height={20}
              width={20}
              alt={'Edit Icon'}
            />
          </div>

          <input
            id={'file-input'}
            type={'file'}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className={'flex flex-col space-y-2 laptop:text-base text-sm'}>
        <div className={'grid grid-cols-[20%_80%] items-center'}>
          <label
            htmlFor={'name'}
            className={'font-semibold text-slate-500 flex-nowrap'}
          >
            {'이름'}
          </label>
          <input
            id={'name'}
            type={'text'}
            name={'name'}
            value={profileData.name}
            onChange={handleInputChange}
            placeholder={'이름'}
            className={
              'p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500'
            }
          />
        </div>
        <div className={'grid grid-cols-[20%_80%] items-center'}>
          <label
            htmlFor={'introduction'}
            className={'font-semibold text-slate-500 flex-nowrap mb-auto'}
          >
            {'소개글'}
          </label>
          <textarea
            id={'introduction'}
            name={'introduction'}
            value={profileData.introduction}
            onChange={handleInputChange}
            placeholder={'소개글'}
            className={
              'p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500'
            }
            rows={4}
          />
        </div>
      </div>
      <div className={'flex justify-center mt-4'}>
        <button
          type={'submit'}
          className={
            'bg-primary hover:bg-primary700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200'
          }
        >
          {'저장하기'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
