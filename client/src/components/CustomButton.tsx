import React, { FC, MouseEvent } from 'react';

interface CustomButtonProps {
  btnType: "button" | "submit" | "reset" | undefined;
  title: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  styles?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
