import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import postFile from '../../_lib/postFile';

interface FileUploadProps {
  fileId: number;
  setFileId: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  label: string;
  description?: string;
  accessToken: string;
}

interface FileWithPreview {
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

const FileUploadSection = ({
  fileId,
  setFileId,
  id,
  label,
  description,
  accessToken,
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
        file: file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      acceptedFiles.forEach((file) => {
        postFile(file, accessToken)
          .then((response) => {
            console.log('Upload success:', response);
            setFileId(response.data);
          })
          .catch((error) => {
            console.error('Upload error:', error);
          });
      });
    },
    [accessToken, setFileId],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filePreviews = files.map((file, index) => (
    <div
      key={index}
      className="mt-2 flex justify-between items-center bg-white p-2 rounded shadow"
    >
      <span className="text-sm text-gray-700">{file.name}</span>
      <button
        type="button"
        onClick={() =>
          setFiles((currentFiles) => currentFiles.filter((f) => f !== file))
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
        className="mt-1 block w-full px-3 py-2 border-dashed border-2 border-primary300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary cursor-pointer"
      >
        <input
          {...getInputProps()}
          id={id}
          aria-label={label}
          aria-describedby={`${id}-description`}
          className="bg-primary100 border-none"
        />
        <p className={isDragActive ? 'text-primary' : 'text-slate-400'}>
          {isDragActive
            ? '파일을 여기에 드롭해주세요!'
            : description ||
              '클릭해서 파일을 업로드하거나 여기에 파일을 드롭해주세요!'}
        </p>
      </div>
      {filePreviews.length > 0 && <div className="mt-4">{filePreviews}</div>}
    </>
  );
};

export default FileUploadSection;
