'use client'

// icons
import { IconType } from 'react-icons'

interface ButtonProps{
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
    type?: 'submit'
}

const Button : React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon,
    type
}) =>{
    return (
       <button 
       type={type}
       onClick={onClick}
       disabled={disabled}
       className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
            ${outline ? 'bg-white' : 'bg-rose-500'}
            ${outline ? 'border-black' : 'border-rose-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-[2px]'}
        `}> 
        {label}
        {icon && (
            <div className="absolute top-[10px] left-4">
                {icon({size: 24})}
            </div>
        )}
       </button>
    )
}

export default Button