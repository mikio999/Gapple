import { v4 as uuidv4 } from 'uuid';
import { nurriCurriculum } from '@/_lib/constants/nurriCurriculum';

interface CurriculumToggleProps {
  selectedNurri: string;
  onNurriClick: (category: string) => void;
  selectedSubNurri: string;
  onSubNurriClick: (
    subCategory: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onDetailClick: (detail: string) => void;
}

const CurriculumToggle = ({
  selectedNurri,
  onNurriClick,
  selectedSubNurri,
  onSubNurriClick,
  onDetailClick,
}: CurriculumToggleProps) => {
  return (
    <div className={'grid laptop:grid-cols-3 grid-cols-2 text-sm mt-2'}>
      <ul className={'flex-1'}>
        {nurriCurriculum.map((item) => {
          const category = Object.keys(item)[0];
          return (
            <li key={uuidv4()}>
              <button
                type="button"
                onClick={() => onNurriClick(category)}
                className={
                  'flex justify-center items-center cursor-pointer w-6/12 p-2 shadow-md text-slate-700'
                }
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
      {selectedNurri && (
        <ul className={'flex-1 flex flex-col'}>
          {nurriCurriculum
            .find((item) => Object.keys(item)[0] === selectedNurri)
            ?.[selectedNurri].map((subItem: any) => {
              const subCategoryKey = Object.keys(subItem)[0];
              return (
                <li key={uuidv4()}>
                  <button
                    type="button"
                    onClick={(e) => onSubNurriClick(subCategoryKey, e)}
                    className={
                      'flex justify-center items-center cursor-pointer w-11/12 p-2 shadow-md text-slate-700'
                    }
                  >
                    {subCategoryKey}
                  </button>
                </li>
              );
            })}
        </ul>
      )}
      {selectedSubNurri && (
        <ul className="flex-1">
          {selectedNurri &&
            nurriCurriculum
              .find((nurri) => Object.keys(nurri)[0] === selectedNurri)
              ?.[selectedNurri].find(
                (subNurri) => Object.keys(subNurri)[0] === selectedSubNurri,
              )
              ?.[selectedSubNurri].map((detail: string) => (
                <li key={uuidv4()}>
                  <button
                    type="button"
                    onClick={() => onDetailClick(detail)}
                    className={
                      'flex justify-center items-center p-2 shadow-md text-slate-700 cursor-pointer whitespace-nowrap laptop:whitespace-normal text-sm'
                    }
                  >
                    {detail}
                  </button>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default CurriculumToggle;
