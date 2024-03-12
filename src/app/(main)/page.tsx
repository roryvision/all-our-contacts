'use client'

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Message from '../../../public/ui/message.svg';
import CloseIcon from '../../../public/ui/close.svg';
import SearchIcon from '../../../public/ui/search.svg';
import AddIcon from '../../../public/ui/create.svg';
import DownloadIcon from '../../../public/ui/download.svg';
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
      <div className='relative z-10 h-screen w-80 block m-auto mt-48'>
        <div className='absolute top-0 right-0 z-0'>
          <Image src={Message} alt='can everyone send their names pls' />
        </div>
        <div className='w-full'>
          <div className='w-fit block m-auto pt-28'>
            <h1 className='text-5xl'>All Our</h1>
            <h1 className='text-5xl font-bold text-sapphire'>Contacts</h1>
            <p className='text-xl my-4'>Know those unknown numbers <br /> with one <span className='text-sapphire'>effortless</span> download</p>
          </div>
          <div className='w-60 block m-auto my-16'>
            <Button className='py-4' isLoading={false} onClick={() => setModalIsOpen(true)}>Get Started</Button>
            <Link onClick = {handleScroll} href='#pitch'><p className='font-jetbrains text-center text-xs underline mt-3'>How does it work?</p></Link>
          </div>
        </div>
      </div>
      <div id='pitch'>
        <div>
          <Image
            src={SearchIcon}
            alt='Close'
            onClick={() => setModalIsOpen(false)} />
          <h2>Find your group</h2>
        </div>
        <div>
          <Image
            src={AddIcon}
            alt='Close'
            onClick={() => setModalIsOpen(false)} />
          <h2>Add your contact</h2>
        </div>
        <div>
          <Image
            src={DownloadIcon}
            alt='Close'
            onClick={() => setModalIsOpen(false)} />
          <h2>Download everybody</h2>
        </div>
      </div>
      <div className={`fixed top-0 left-0 z-30 w-full h-full bg-black/40 backdrop-blur-sm ${modalIsOpen ? 'block' : 'hidden'}`}>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-72 rounded-lg'>
          <Image 
            src={CloseIcon} 
            alt='Close' 
            onClick={() => setModalIsOpen(false)}
            className='float-right hover:cursor-pointer' /> <br />
          <Search groupId={''} />
        </div>
      </div>
    </>
  );
}
