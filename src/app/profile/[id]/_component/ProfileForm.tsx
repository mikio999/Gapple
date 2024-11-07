import React, {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { IProfileData } from '@/types/profile';
import postFiles from '@/app/lessonForm/_lib/postFiles';

interface ProfileFormProps {
  profileData: IProfileData;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleImageChange: (imageSrc: string) => void;
  handleSetImageId: (id: number) => void;
  accessToken: string;
  loading: boolean;
}

interface ImageWithPreview {
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const ProfileForm = ({
  profileData,
  handleInputChange,
  handleSubmit,
  handleImageChange,
  handleSetImageId,
  accessToken,
  loading,
}: ProfileFormProps) => {
  const [imagePreview, setImagePreview] = useState<string>(profileData.image);
  const [toast, setToast] = useState<string>('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        setToast('하나의 이미지만 업로드할 수 있습니다.');
        setTimeout(() => setToast(''), 5000);
        return;
      }

      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const formData = new FormData();
      formData.append('files', file);

      postFiles(formData, accessToken)
        .then((response) => {
          if (response.imageId) {
            handleSetImageId(response.imageId);
            handleImageChange(response.data);
          }
        })
        .catch((error) => {
          console.error('Failed to upload file:', error);
        });
    },
    [accessToken, handleSetImageId, handleImageChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col space-y-4 p-6'}>
      {toast && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}
      <div
        {...getRootProps()}
        className={`flex justify-center items-center cursor-pointer ${isDragActive ? 'bg-slate-700 text-white' : 'bg-white'}`}
      >
        <input
          {...getInputProps()}
          id="file-input"
          type="file"
          style={{ display: 'none' }}
        />
        <div
          className="relative w-24 h-24 mb-4"
          style={{
            backgroundImage: `url(${imagePreview || '/default-profile.jpg'})`,
            backgroundSize: 'cover',
          }}
        >
          <Image
            src={imagePreview || '/default-profile.jpg'}
            alt="Profile Picture"
            layout="fill"
            className="rounded-full"
          />
          <div
            className={`absolute inset-0 flex justify-center items-center ${isDragActive ? 'bg-slate-900 bg-opacity-50' : 'bg-slate-100 bg-opacity-50'}`}
          >
            {isDragActive ? '이미지를 여기에 드롭해주세요!' : '수정하기'}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 laptop:text-base text-sm">
        <div className="grid grid-cols-[20%_80%] items-center">
          <label
            htmlFor="name"
            className="font-semibold text-slate-500 flex-nowrap"
          >
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="이름"
            className="p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500"
          />
        </div>
        <div className="grid grid-cols-[20%_80%] items-center">
          <label
            htmlFor="introduction"
            className="font-semibold text-slate-500 flex-nowrap mb-auto"
          >
            소개글
          </label>
          <textarea
            id="introduction"
            name="introduction"
            value={profileData.introduction}
            onChange={handleInputChange}
            placeholder="소개글"
            className="p-2 rounded-md bg-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary500"
            rows={4}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200"
        >
          {loading ? '저장중...' : '저장하기'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
