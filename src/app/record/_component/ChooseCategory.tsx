import React, { useState } from 'react';

import { category } from '@/_lib/constants/category';
import RecordCategorySelect from './RecordCategorySelect';

export default function ChooseCategory({ onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log(selectedCategory);
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleConfirmCategory = () => {
    onSelectCategory(selectedCategory);
  };

  return (
    <>
      <RecordCategorySelect
        options={category}
        onSelect={handleSelectCategory}
        selectedActivityType={selectedCategory}
      />
      {selectedCategory && (
        <button
          onClick={handleConfirmCategory}
          className="ml-auto mt-4 bg-primary700 text-white px-4 py-2 rounded hover:bg-primary"
        >
          다음
        </button>
      )}
    </>
  );
}
