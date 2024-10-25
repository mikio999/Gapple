'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TabComponent() {
  const pathname = usePathname();

  const hoverEffect = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const tabTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  };

  return (
    <div
      className={
        'flex justify-around mb-4 border-b text-slate-800 w-[90dvw] laptop:w-[60dvw]'
      }
    >
      <motion.div
        className={'relative'}
        initial={'rest'}
        whileHover={'hover'}
        animate={'rest'}
        variants={hoverEffect}
      >
        <Link
          href={'/profile/plan'}
          className={`p-4 pb-6 ${pathname === '/profile/plan' ? 'text-blue-500' : ''}`}
        >
          {'계획안'}
        </Link>

        {pathname === '/profile/plan' && (
          <motion.div
            className={
              'absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 mt-1'
            }
            layoutId={'underline'}
            transition={tabTransition}
          />
        )}
      </motion.div>

      <motion.div
        className={'relative'}
        initial={'rest'}
        whileHover={'hover'}
        animate={'rest'}
        variants={hoverEffect}
      >
        <Link
          href={'/profile/record'}
          className={`p-4 pb-6 ${pathname === '/profile/record' ? 'text-blue-500' : ''}`}
        >
          {'기록'}
        </Link>

        {pathname === '/profile/record' && (
          <motion.div
            className={
              'absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 mt-1'
            }
            layoutId={'underline'}
            transition={tabTransition}
          />
        )}
      </motion.div>
      <motion.div
        className={'relative'}
        initial={'rest'}
        whileHover={'hover'}
        animate={'rest'}
        variants={hoverEffect}
      >
        <Link
          href={'/profile/scrap'}
          className={`p-4 pb-6 ${pathname === '/profile/scrap' ? 'text-blue-500' : ''}`}
        >
          {'스크랩'}
        </Link>
        {pathname === '/profile/scrap' && (
          <motion.div
            className={
              'absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 mt-1'
            }
            layoutId={'underline'}
            transition={tabTransition}
          />
        )}
      </motion.div>
    </div>
  );
}
