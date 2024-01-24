import Button from '@/components/Button';
import Image from 'next/image';
import message from '../../../public/ui/message.svg';

export default function Home() {
  return (
    <>
      <div className='flex items-center h-screen z-10'>
        <div className='w-full'>
          <h1 className='text-5xl'>All Our</h1>
          <h1 className='text-5xl font-bold text-sapphire'>Contacts</h1>
          <p className='text-xl my-4'>Know those unknown numbers <br /> with one <span className='text-sapphire'>effortless</span> download</p>
          <div className='w-60 m-auto my-16 block'>
            <Button isLoading={false}>Get Started</Button>
            <p className='font-jetbrains text-center text-xs underline mt-3'>How does it work?</p>
          </div>
        </div>
      </div>
      <div className='absolute top-11 right-8 z-0 float-right'>
        <Image src={message} alt='can everyone send their names pls' />
      </div>
    </>
  );
}
