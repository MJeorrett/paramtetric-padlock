import React from 'react';

type ColorControlProps = {
  value: string,
  setValue: (value: string) => void,
  label: string,
};

export const ColorControl: React.FC<ColorControlProps> = ({
  value,
  setValue,
  label,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="color" value={value} onChange={changeHandler} />
    </div>
  );
};