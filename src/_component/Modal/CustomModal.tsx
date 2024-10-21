import { useCallback, ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal = ({ isOpen, onClose, children }: CustomModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className={
        'fixed inset-0 bg-slate-700 bg-opacity-50 flex justify-center items-center z-10'
      }
      onClick={handleOverlayClick}
    >
      <div
        className={
          'bg-white p-5 rounded-lg relative w-dvw h-dvh laptop:w-6/12 laptop:h-4/6 mx-4'
        }
      >
        <button
          className={
            'absolute top-3 right-3 text-xl bg-transparent border-none cursor-pointer'
          }
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
