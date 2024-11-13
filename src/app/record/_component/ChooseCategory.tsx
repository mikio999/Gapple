'use client';

import React, { useState } from 'react';
import { category } from '@/_lib/constants/category';
import CategorySelect from '@/app/lessonForm/_component/select/CategorySelect';

export default function ChooseCategory({ onSelectCategory }) {
  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <CategorySelect
      options={category}
      onSelect={handleSelectCategory}
      selectedActivityType={''}
    />
  );
}
