import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ContentItem {
  id: string;
  subtitle: string;
  content: string;
}

interface ContentSectionProps {
  contents: ContentItem[];
  setContents: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

const ContentSection = ({ contents, setContents }: ContentSectionProps) => {
  const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addContent = () => {
    if (contents.length < 10 && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setContents((prevContents) => [
          ...prevContents,
          { id: uuidv4(), subtitle: '', content: '' }, // subtitle과 content 둘 다 추가
        ]);
        setIsAdding(false);
      }, 50);
    }
  };

  // 항목 수정
  const handleContentChange = (
    id: string,
    field: 'subtitle' | 'content',
    value: string,
  ) => {
    setContents((prevContents) =>
      prevContents.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  // 항목 삭제
  const deleteContent = (id: string) => {
    setContents((prevContents) =>
      prevContents.filter((item) => item.id !== id),
    );
  };

  // Enter 키를 누르면 항목 추가
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addContent();
    }
  };

  // 새로운 항목 추가 시 마지막 textarea로 포커스 이동
  useEffect(() => {
    const lastInput = inputRefs.current[contents.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  }, [contents.length]);

  return (
    <div>
      <h1 className={'title-effect mb-4'}>{'세부 내용'}</h1>
      {contents.map((content, index) => (
        <div key={content.id} className={'flex flex-col mb-4'}>
          <div className="flex items-center mb-2">
            <label
              htmlFor={`subtitle-${index}`}
              className={
                'flex justify-center items-center text-sm font-medium mr-2 w-8 h-8 rounded-full bg-primary100 text-slate-600'
              }
            >
              {index + 1}
            </label>
            <input
              id={`subtitle-${index}`}
              value={content.subtitle}
              onChange={(e) =>
                handleContentChange(content.id, 'subtitle', e.target.value)
              }
              className={
                'block w-full mt-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
              }
              placeholder="소제목을 입력하세요"
            />
          </div>

          <div className="flex items-center mb-2">
            <textarea
              id={`content-${index}`}
              value={content.content}
              onChange={(e) =>
                handleContentChange(content.id, 'content', e.target.value)
              }
              onKeyDown={handleKeyDown}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={
                'block w-full mt-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
              }
              rows={3}
              placeholder="세부 내용을 입력하세요"
            />
            <button
              type={'button'}
              onClick={() => deleteContent(content.id)}
              className={
                'flex justify-center items-center rounded-full hover:bg-primary100 ml-2'
              }
            >
              <img
                src={'/icons/deletetrash.png'}
                width={16}
                height={16}
                alt={'delete'}
              />
            </button>
          </div>
        </div>
      ))}
      <div className={'flex justify-center mt-2'}>
        <button
          type={'button'}
          onClick={addContent}
          className={
            'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary w-12 h-12'
          }
        >
          {'+'}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
