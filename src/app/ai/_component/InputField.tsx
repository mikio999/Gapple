interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function InputField({ value, onChange, placeholder }: InputFieldProps) {
  return (
    <div>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

export default InputField;
