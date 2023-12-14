"use client";

import { IconType } from "react-icons";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
interface CategoryBoxProps {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = "";

    if (params.get("category") !== label.toLowerCase()) {
      currentQuery = "?category=" + label.toLowerCase();
    }else{
      currentQuery = '/'
    }

    router.push(currentQuery);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      {label}
    </div>
  );
};

export default CategoryBox;
