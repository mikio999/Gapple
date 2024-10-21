import { IProfileData } from '@/types/profile';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProfileFormProps {
  profileData: IProfileData;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Profile Image
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img src={imagePreview} alt="Profile" />
          </span>
          <input
            type="file"
            className="ml-5 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onChange={handleFileChange}
          />
        </div>
      </label>
      <input
        type="text"
        name="name"
        value={profileData.name}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Name"
      />
      <input
        type="text"
        name="experienceLevel"
        value={profileData.experienceLevel}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Experience Level"
      />
      <input
        name="introduction"
        value={profileData.introduction}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Introduction"
      />
      <button type={'submit'}>저장하기</button>
    </form>
  );
};

export default ProfileForm;
