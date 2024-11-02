import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import postFile from '../../_lib/postFile';

interface ImageUploadProps {
  imageId: number;
  setImageId: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  label: string;
  description?: string;
  accessToken: string;
}

interface ImageWithPreview {
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const ImageUploadSection = ({
  imageId,
  setImageId,
  id,
  label,
  description,
  accessToken,
}: ImageUploadProps) => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
        file: file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);

      acceptedFiles.forEach((file) => {
        postFile(file, accessToken)
          .then((response) => {
            console.log('Upload success:', response);
            setImageId(response.data);
          })
          .catch((error) => {
            console.error('Upload error:', error);
          });
      });
    },
    [accessToken, setImageId],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const imagePreviews = images.map((image, index) => (
    <div
      key={index}
      className="mt-2 flex justify-between items-center bg-white p-2 rounded shadow w-36"
    >
      <div className="relative w-24 h-24">
        <Image
          src={image.preview}
          layout="fill"
          objectFit="cover"
          alt={image.name}
        />
      </div>
      <button
        type="button"
        onClick={() =>
          setImages((currentImages) =>
            currentImages.filter((img) => img !== image),
          )
        }
        className="text-red-500 hover:text-red-700"
      >
        <Image
          src="/icons/deletetrash.png"
          width={16}
          height={16}
          alt="Delete"
        />
      </button>
    </div>
  ));

  return (
    <>
      <h1 className="title-effect">{label}</h1>
      <div
        {...getRootProps()}
        className="flex justify-center items-center mt-1 w-full px-3 py-12 border-2 border-primary500 hover:bg-primary100 rounded-md shadow-sm focus:outline-none focus:ring-primary200 focus:bg-primary100 cursor-pointer"
      >
        <input
          {...getInputProps()}
          id={id}
          aria-label={label}
          aria-describedby={`${id}-description`}
          className={'bg-pink-100 border-none'}
        />
        <Image
          src={'/icons/imagePink.png'}
          width={45}
          height={45}
          alt={'image'}
          className={'mr-2'}
        />
        <p className={isDragActive ? 'text-primary700' : 'text-slate-700'}>
          {isDragActive
            ? '이미지를 여기에 드롭해주세요!'
            : description ||
              '클릭해서 이미지를 업로드하거나 여기에 이미지를 드롭해주세요!'}
        </p>
      </div>
      {imagePreviews.length > 0 && <div className="mt-4">{imagePreviews}</div>}
    </>
  );
};

export default ImageUploadSection;
