import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { ItemInput } from '../input/ItemInput';

interface Item {
  id: string;
  text: string;
}

interface ItemSectionProps {
  title: string;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  maxItems: number;
}

const ItemSection = ({
  title,
  items,
  setItems,
  maxItems,
}: ItemSectionProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = () => {
    if (items.length < maxItems && !isAdding) {
      setIsAdding(true);
      setTimeout(() => {
        setItems((prevItems) => [...prevItems, { id: uuidv4(), text: '' }]);
        setIsAdding(false);
      }, 50);
    }
  };

  const handleItemChange = (id: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: value } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const lastInput = inputRefs.current[items.length - 1];
    if (lastInput) {
      lastInput.focus();
    }
  }, [items.length]);

  return (
    <>
      <h1 className={'title-effect'}>{title}</h1>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className={'flex items-center mb-2'}>
            <ItemInput
              key={item.id}
              id={`${index + 1}`}
              value={item.text}
              onChange={(value) => handleItemChange(item.id, value)}
              onEnterPress={addItem}
              inputRef={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
            />
            {items.length > 1 && (
              <button
                type={'button'}
                onClick={() => deleteItem(item.id)}
                className={
                  'flex justify-center items-center rounded-full hover:bg-primary100 ml-2'
                }
              >
                <Image
                  src={'/icons/deletetrash.png'}
                  width={16}
                  height={16}
                  alt={'delete'}
                />
              </button>
            )}
          </div>
        ))}
        {items.length < maxItems && (
          <div className={'flex justify-center'}>
            <button
              type={'button'}
              onClick={addItem}
              className={
                'mt-2 bg-primary500 hover:bg-primary text-white font-bold py-2 px-4 rounded'
              }
            >
              {'+'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemSection;
