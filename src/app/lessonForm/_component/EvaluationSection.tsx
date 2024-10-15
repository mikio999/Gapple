import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import { InputText } from './InputText';

interface Evaluation {
  id: string;
  text: string;
}

interface EvaluationsSectionProps {
  evaluations: Evaluation[];
  setEvaluations: React.Dispatch<React.SetStateAction<Evaluation[]>>;
}

const EvaluationsSection = ({
  evaluations,
  setEvaluations,
}: EvaluationsSectionProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // input 요소들을 참조하는 ref 배열
  const [isAdding, setIsAdding] = useState(false); // 중복 추가 방지를 위한 상태값

  const addEvaluation = () => {
    if (evaluations.length < 3 && !isAdding) {
      // 최대 3개까지 추가 가능
      setIsAdding(true); // 추가 중 상태로 변경
      setTimeout(() => {
        setEvaluations((prevEvaluations) => [
          ...prevEvaluations,
          { id: uuidv4(), text: '' },
        ]);
        setIsAdding(false); // 추가 작업 완료 후 상태값 리셋
      }, 50); // 딜레이를 주어 렌더링이 완료된 후 포커스가 맞춰지도록
    }
  };

  const handleEvaluationChange = (id: string, value: string) => {
    setEvaluations((prevEvaluations) =>
      prevEvaluations.map((evaluation) =>
        evaluation.id === id ? { ...evaluation, text: value } : evaluation,
      ),
    );
  };

  useEffect(() => {
    const lastInput = inputRefs.current[evaluations.length - 1];
    if (lastInput) {
      lastInput.focus(); // 마지막으로 추가된 input에 포커스
    }
  }, [evaluations.length]);

  return (
    <>
      <h1 className={'title-effect'}>{'평가'}</h1>
      <div>
        {evaluations.map((evaluation, index) => (
          <InputText
            key={evaluation.id}
            id={`${index + 1}`}
            value={evaluation.text}
            onChange={(value) => handleEvaluationChange(evaluation.id, value)}
            onEnterPress={addEvaluation}
            inputRef={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
        {evaluations.length < 3 && (
          <button
            type={'button'}
            onClick={addEvaluation}
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

export default EvaluationsSection;
