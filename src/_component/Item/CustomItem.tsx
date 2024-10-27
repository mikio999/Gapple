'use client';

import { motion } from 'framer-motion';

interface CustomItemProps {
  children: React.ReactNode;
}

const CustomItem = ({ children }: CustomItemProps) => {
  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className={
        'flex flex-col bg-slate-200 shadow rounded-lg p-4 mb-4 w-[90vw] laptop:w-[30rem] desktop:w-[40rem] h-auto mx-auto hover:cursor-pointer'
      }
      whileHover={'hover'}
      variants={hoverVariants}
    >
      {children}
    </motion.div>
  );
};

export default CustomItem;
