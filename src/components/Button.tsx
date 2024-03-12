import { ButtonHTMLAttributes, FC } from 'react';
import Image from 'next/image';
import loading from '../../public/ui/loading.svg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ className, children, isLoading, ...props }) => {
  return (
    <button
      className={`bg-sapphire text-white text-base w-full rounded-full flex justify-center ${className}`}
      disabled={isLoading} {...props}>
      {isLoading ? <Image src={loading} alt='Loading symbol' className='animate-spin' /> : children}
    </button>
  )
}

export default Button