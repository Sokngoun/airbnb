"use client";

import { register } from "module";
// react hook form
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// icons
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formartPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  formartPrice,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formartPrice && (
        <BiDollar
          className="absolute text-neutral-700 top-5 left-2"
          size={24}
        />
      )}
      <input type={type} 
      placeholder=" "
      className={`
      peer w-full p-2 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
      ${formartPrice ? 'pl-6' : 'pl-4'}
      ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
      ${errors[id] ? 'focus:border-red-500' : 'focus:border-black'}
      `} disabled={disabled} id={id} {...register(id,{required})}/>
      <label className={`
        absolute
        text-sm
        duration-150
        transform
        -translate-y-5
        top-5
        z-10
        origin-[0]
        ${formartPrice ? 'left-6' : 'left-4'}
        peer-placeholder-shown:scale-90
        peer-placeholder-shown:-translate-y-1 
        peer-focus:scale-75
        peer-focus:-translate-y-5
        ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
      `}>
        {label}
      </label>
    </div>
  );
};

export default Input;
