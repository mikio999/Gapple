import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { IContentItem } from '@/types/content';
import { useSubjectStore } from '@/app/ai/_store/useSubjectStore';

interface ContentSectionProps {
  contents: IContentItem[];
  setContents: React.Dispatch<React.SetStateAction<IContentItem[]>>;
}

const ContentSection = ({ contents, setContents }: ContentSectionProps) => {
  const { documentData } = useSubjectStore();
  const pathname = usePathname();

  const [isAdding, setIsAdding] = useState(false);
  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  useEffect(() => {
    if (documentData && pathname === '/ai') {
      const loadedContents = documentData.data.activity_content.map((item) => {
        const splitContents = item.content
          .split(/(?<=[.?])\s*/)
          .map((text) => ({
            id: uuidv4(),
            text: text.trim(),
          }));

        return {
          id: uuidv4(),
          subtitle: item.subtitle,
          contents: splitContents,
        };
      });

      setContents(loadedContents);
    } else {
      const initialContents = [
        {
          id: uuidv4(),
          subtitle: '',
          contents: [{ id: uuidv4(), text: '' }],
        },
      ];
      setContents(initialContents);
    }
  }, [setContents]);

  const addContent = () => {
    if (contents.length < 10 && !isAdding) {
      setIsAdding(true);
      const newContent = {
        id: uuidv4(),
        subtitle: '',
        contents: [{ id: uuidv4(), text: '' }],
      };
      setContents((prevContents) => [...prevContents, newContent]);
      setIsAdding(false);
    }
  };

  const addItemContent = (contentId: string) => {
    if (!isAdding) {
      setIsAdding(true);
      setContents((prevContents) =>
        prevContents.map((content) =>
          content.id === contentId
            ? {
                ...content,
                contents: [...content.contents, { id: uuidv4(), text: '' }],
              }
            : content,
        ),
      );

      setTimeout(() => {
        setIsAdding(false);
        const lastContent = contents.find(
          (content) => content.id === contentId,
        );
        if (lastContent?.contents) {
          const lastKey = `${lastContent.id}-${lastContent.contents.length - 1}`;
          inputRefs.current[lastKey]?.focus();
        }
      }, 50);
    }
  };

  const reorder = (
    list: IContentItem[],
    startIndex: number,
    endIndex: number,
  ): IContentItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      contents,
      result.source.index,
      result.destination.index,
    );
    setContents(items);
  };

  const handleContentChange = (
    id: string,
    field: keyof IContentItem,
    value: string,
  ) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? { ...content, [field]: value } : content,
      ),
    );
  };

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
              contents: content.contents.map((item, index) =>
                index === contentIndex ? { ...item, text: value } : item,
              ),
            }
          : content,
      ),
    );
  };

  const deleteContent = (id: string) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== id),
    );
  };

  const deleteItemContent = (contentId: string, contentIndex: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === contentId
          ? {
              ...content,
              contents: content.contents.filter(
                (_, index) => index !== contentIndex,
              ),
            }
          : content,
      ),
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable-content-section'}>
          {(provided, snapshot) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={'p-4'}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? 'rgb(248 250 252)'
                  : 'white',
              }}
            >
              {contents.map((content, index) => (
                <Draggable
                  key={content.id}
                  draggableId={content.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.draggableProps}
                      className={`mb-4 p-4 border border-slate-100 shadow-sm ${snapshot.isDragging ? 'bg-primary100' : ''}`}
                    >
                      <div className={'flex justify-between'}>
                        <div
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...provided.dragHandleProps}
                          style={{ cursor: 'grab' }}
                        >
                          <Image
                            src={'/icons/linesSlate.png'}
                            width={10}
                            height={10}
                            alt={'Drag Handle'}
                            className={'p-1 w-6 h-6 opacity-50'}
                          />
                        </div>
                        {contents.length > 1 && (
                          <button
                            type={'button'}
                            onClick={() => deleteContent(content.id)}
                            className={
                              'flex justify-center items-center rounded-full hover:bg-primary100 ml-auto p-1 w-8 h-8'
                            }
                          >
                            <Image
                              src={'/icons/deletetrash.png'}
                              width={15}
                              height={15}
                              alt={'Delete'}
                            />
                          </button>
                        )}
                      </div>
                      <div className={'flex items-center mb-2'}>
                        <label
                          htmlFor={`subtitle-${index}`}
                          className={
                            'text-sm font-medium mr-2 w-8 h-8 rounded-full bg-primary100 text-slate-600 flex justify-center items-center'
                          }
                        >
                          {index + 1}
                        </label>
                        <input
                          id={`subtitle-${index}`}
                          value={content.subtitle}
                          onChange={(e) =>
                            handleContentChange(
                              content.id,
                              'subtitle',
                              e.target.value,
                            )
                          }
                          className={
                            'block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                          }
                          placeholder={'소제목을 입력하세요'}
                        />
                      </div>
                      {content.contents.map((item, contentIndex) => (
                        <div key={item.id} className={'flex items-center'}>
                          <textarea
                            value={item.text}
                            onChange={(e) =>
                              handleItemContentChange(
                                content.id,
                                contentIndex,
                                e.target.value,
                              )
                            }
                            className={
                              'block w-full h-16 px-3 py-2 border mt-2 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                            }
                            rows={3}
                            placeholder={`교사발문 ${contentIndex + 1}`}
                          />
                          <button
                            type={'button'}
                            onClick={() =>
                              deleteItemContent(content.id, contentIndex)
                            }
                            className={'ml-2 text-red-500 hover:text-red-700'}
                          >
                            <Image
                              src={'/icons/deleteContent.png'}
                              width={12}
                              height={12}
                              alt={'Delete'}
                            />
                          </button>
                        </div>
                      ))}
                      <div className={'flex justify-center'}>
                        <button
                          type={'button'}
                          onClick={() => addItemContent(content.id)}
                          className={
                            'button-border py-2 px-4 bg-primary text-white text-lg rounded-full hover:bg-primary-dark hover:bg-white hover:text-primary mt-2 w-12 h-12 flex justify-center items-center'
                          }
                        >
                          {'+'}
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={'flex justify-center mt-2'}>
        <button
          type={'button'}
          onClick={addContent}
          className={
            'button-border py-2 px-4 bg-primary text-white text-sm rounded-full hover:bg-primary-dark hover:bg-white hover:text-primary h-12 flex justify-center items-center'
          }
        >
          {'세부내용 추가'}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
