import { FC } from 'react'

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  hasError?: boolean;
}

const InputField: FC<InputFieldProps> = ({ label, name, type, placeholder, defaultValue, maxLength, hasError }) => {
  return (
    <>
      <label htmlFor={name} className='font-jetbrains text-sm'>{label}</label>
      <input 
        type={type} 
        name={name} 
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className={`appearance-none border rounded w-full py-2 px-3 mb-2 font-jetbrains text-gray-700 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline ${hasError ? 'border-red-500' : '' }`} />
    </>
  )
}

export default InputField;
