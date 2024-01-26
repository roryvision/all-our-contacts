'use client'

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Message from '../../../public/ui/message.svg';
import Close from '../../../public/ui/close.svg';
import Search from './Search';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = e.currentTarget.href.replace(/.*\#/, '');

    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className='flex items-center h-screen z-10'>
        <div className='w-full'>
          <h1 className='text-5xl'>All Our</h1>
          <h1 className='text-5xl font-bold text-sapphire'>Contacts</h1>
          <p className='text-xl my-4'>Know those unknown numbers <br /> with one <span className='text-sapphire'>effortless</span> download</p>
          <div className='w-60 m-auto my-16 block'>
            <Button isLoading={false} onClick={() => setModalIsOpen(true)}>Get Started</Button>
            <Link onClick = {handleScroll} href='#pitch'><p className='font-jetbrains text-center text-xs underline mt-3'>How does it work?</p></Link>
          </div>
        </div>
      </div>
      <div id='pitch'>
        <p>pitch</p>
      </div>
      <div className='absolute top-11 right-8 z-0 float-right'>
        <Image src={Message} alt='can everyone send their names pls' />
      </div>
      <div className={`fixed top-0 left-0 z-30 w-full h-full bg-black/60  ${modalIsOpen ? 'block' : 'hidden'}`}>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8'>
          <Image 
            src={Close} 
            alt='Close' 
            onClick={() => setModalIsOpen(false)}
            className='float-right' /> <br />
          <Search groupId={''} />
        </div>
      </div>
    </>
  );
}
