import { ToolInput } from './ToolInput';

interface ToolSectionProps {
  tools: string[];
  setTools: React.Dispatch<React.SetStateAction<string[]>>;
}

const ToolSection = ({ tools, setTools }: ToolSectionProps) => {
  const addTool = () => {
    if (tools.length < 10) {
      setTools([...tools, '']);
    }
  };

  const handleToolChange = (index: number, value: string) => {
    const newtools = [...tools];
    newtools[index] = value;
    setTools(newtools);
  };

  const removeTool = (index: number) => {
    const newTools = [...tools];
    newTools.splice(index, 1);
    setTools(newTools);
  };
  return (
    <>
      <h1 className={'title-effect'}>{'활동 도구'}</h1>
      <div className={'grid laptop:grid-cols-4 grid-cols-2 gap-5'}>
        {tools.map((tool, index) => (
          <div key={index} className={'flex items-center space-x-2'}>
            <ToolInput
              label={`도구 ${index + 1}`}
              id={`${index + 1}`}
              value={tool}
              onChange={(value) => handleToolChange(index, value)}
            />
            {tools.length !== 1 ? (
              <button
                type={'button'}
                onClick={() => removeTool(index)}
                className={'text-slate-400 text-xs ml-2 hover:text-red-700'}
              >
                {'✕'}
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
        {tools.length < 10 && (
          <button
            type={'button'}
            onClick={addTool}
            className={
              'flex mr-auto ml-auto mt-2 bg-primary text-white font-bold py-2 px-4 rounded'
            }
          >
            {'+'}
          </button>
        )}
      </div>
    </>
  );
};

export default ToolSection;
