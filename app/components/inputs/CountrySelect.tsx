"use client";

import useCountries from "@/app/hook/useCountires";
import Select from "react-select";

export type CountrySelectValue = {
  label: string;
  value: string;
  flag: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div className="">
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 hover:cursor-pointer">
            <div>{option.flag}</div>
            <div>
                {option.label},
                <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2 hover:cursor-point',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme)=>({
          ...theme,
          borderRadius: 6,
          colors:{
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
};

export default CountrySelect;
