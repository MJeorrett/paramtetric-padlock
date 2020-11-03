import React from 'react';

type NumberControlProps = {
  value: number,
  setValue: (value: number) => void,
  label: string,
  min?: number,
  max?: number,
  step?: number,
};

export const NumberControl: React.FC<NumberControlProps> = ({
  value,
  setValue,
  label,
  min = 0,
  max,
  step = 0.01,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  return (
    <div>
      <label>{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={changeHandler} />
      <input type="number" min={min} max={max} step={step} value={value} onChange={changeHandler} />
    </div>
  );
};