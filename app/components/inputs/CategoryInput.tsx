"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl p-4 border-2 flex flex-col gap-2 cursor-pointer  text-neutral-800 hover:border-black transition ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={32} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
