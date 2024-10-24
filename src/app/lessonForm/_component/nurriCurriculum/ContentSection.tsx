import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ContentItem {
  id: string;
  subtitle: string;
  contents: string[];
}

interface ContentSectionProps {
  contents: ContentItem[];
  setContents: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

const ContentSection = ({ contents, setContents }: ContentSectionProps) => {
  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
  const [isAdding, setIsAdding] = useState(false);

  // 항목 추가
  const addContent = () => {
    if (contents.length < 10 && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setContents((prevContents) => [
          ...prevContents,
          { id: uuidv4(), subtitle: '', contents: [''] },
        ]);
        setIsAdding(false);
      }, 50);
    }
  };

  // 항목 수정
  const handleContentChange = (
    id: string,
    field: 'subtitle' | 'contents',
    value: string | string[],
  ) => {
    setContents((prevContents) =>
      prevContents.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  // 교사발문(contents) 수정
  const handleItemContentChange = (
    contentId: string,
    contentIndex: number,
    value: string,
  ) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === contentId
          ? {
              ...content,
              contents: content.contents.map((text, i) =>
                i === contentIndex ? value : text,
              ),
            }
          : content,
      ),
    );
  };

  // 교사발문(contents) 추가 후 마지막 textarea로 포커스 이동
  const addItemContent = (contentId: string) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === contentId
          ? { ...content, contents: [...(content.contents || []), ''] }
          : content,
      ),
    );

    setTimeout(() => {
      const lastContent = contents.find((content) => content.id === contentId);
      if (lastContent?.contents && lastContent.contents.length > 0) {
        const lastKey = `${lastContent.id}-${lastContent.contents.length - 1}`;
        if (inputRefs.current[lastKey]) {
          inputRefs.current[lastKey]?.focus();
        }
      }
    }, 0);
  };

  // 항목 삭제
  const deleteContent = (id: string) => {
    setContents((prevContents) =>
      prevContents.filter((item) => item.id !== id),
    );
  };

  // 교사발문(contents) 삭제
  const deleteItemContent = (contentId: string, contentIndex: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === contentId
          ? {
              ...content,
              contents: content.contents.filter((_, i) => i !== contentIndex),
            }
          : content,
      ),
    );
  };

  // 새로운 항목 추가 시 마지막 textarea로 포커스 이동
  useEffect(() => {
    if (contents.length > 0) {
      const lastContent = contents[contents.length - 1];
      if (lastContent?.contents && lastContent.contents.length > 0) {
        const lastKey = `${lastContent.id}-${lastContent.contents.length - 1}`;
        if (inputRefs.current[lastKey]) {
          inputRefs.current[lastKey]?.focus();
        }
      }
    }
  }, [contents.length]);

  return (
    <div>
      <h1 className={'title-effect mb-4'}>{'세부 내용'}</h1>
      {contents.map((content, index) => (
        <div
          key={content.id}
          className={'flex flex-col mb-4 border border-slate-100 shadow-sm p-4'}
        >
          <button
            type={'button'}
            onClick={() => deleteContent(content.id)}
            className={
              'flex justify-center items-center rounded-full hover:bg-primary100 ml-auto p-1 w-8 h-8'
            }
          >
            <img
              src={'/icons/deletecontent.png'}
              width={16}
              height={16}
              alt={'delete'}
            />
          </button>
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
          {content.contents?.map((itemContent, contentIndex) => {
            const key = `${content.id}-${contentIndex}`;
            return (
              <div key={key} className="flex items-center mb-2">
                <textarea
                  ref={(el) => {
                    inputRefs.current[key] = el;
                  }}
                  value={itemContent}
                  onChange={(e) => {
                    const updatedValue = e.target.value.replace(/\n/g, ' ');
                    handleItemContentChange(
                      content.id,
                      contentIndex,
                      updatedValue,
                    );
                  }}
                  className="block w-full h-16 mt-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  rows={3}
                  placeholder={`교사발문 ${contentIndex + 1}`}
                />
                {content.contents.length > 1 && (
                  <button
                    type={'button'}
                    onClick={() => deleteItemContent(content.id, contentIndex)}
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
                )}
              </div>
            );
          })}
          <div className={'flex justify-center'}>
            <button
              type={'button'}
              onClick={() => addItemContent(content.id)}
              className={
                'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary mt-2 w-12 h-12'
              }
            >
              {'+'}
            </button>
          </div>
        </div>
      ))}

      <div className={'flex justify-center mt-2'}>
        <button
          type={'button'}
          onClick={addContent}
          className={
            'flex justify-center items-center button-border py-2 px-4 bg-primary text-white text-sm rounded-full hover:bg-primary-dark button-effect hover:bg-white hover:text-primary h-12'
          }
        >
          {'세부내용 추가'}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
