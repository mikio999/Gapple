interface ItemInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

export const ItemInput = ({
  id,
  value,
  onChange,
  onEnterPress,
  inputRef,
}: ItemInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnterPress();
      event.preventDefault();
    }
  };

  return (
    <div className={'flex items-center'}>
      <label
        htmlFor={id}
        className={
          'flex justify-center items-center text-sm font-medium mr-2 w-8 h-8 rounded-full bg-primary100 text-slate-600'
        }
      >
        {id}
      </label>
      <input
        type={'text'}
        id={id}
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={
          'block mt-1 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary w-[68dvw] laptop:w-[75dvw] desktop:w-[800px]'
        }
      />
    </div>
  );
};
