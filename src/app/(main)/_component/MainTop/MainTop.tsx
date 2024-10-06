'use client';

import { useState } from 'react';

import Dropdown from '../NavBar/Dropdown';
import SearchBar from '../SearchBar/SearchBar';
import CreateButton from '../Create/CreateButton';

function MainTop() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const subMenuItems = [
    { name: 'AI 계획안 생성하기', link: '/ai' },
    { name: '계획안 글쓰기', link: '/lessonForm' },
    { name: '수업 사진 기록하기', link: '/record' },
  ];

  return (
    <div className={'flex justify-around'}>
      <SearchBar />
      <CreateButton />
    </div>
  );
}

export default MainTop;
