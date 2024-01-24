import { ButtonHTMLAttributes, FC } from 'react';
import Image from 'next/image';
import loading from '../../public/ui/loading.svg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({ className, children, isLoading, ...props }) => {
  return (
    <button
      className='bg-sapphire text-white text-base w-full py-4 rounded-full flex justify-center'
      disabled={isLoading} {...props}>
      {isLoading ? <Image src={loading} alt='Loading symbol' className='animate-spin' /> : children}
    </button>
  )
}

export default Button