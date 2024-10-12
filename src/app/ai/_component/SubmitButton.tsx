interface SubmitButtonProps {
  onClick: () => void;
  label: string;
}

function SubmitButton({ onClick, label }: SubmitButtonProps) {
  return (
    <button type={'button'} onClick={onClick}>
      {label}
    </button>
  );
}

export default SubmitButton;
