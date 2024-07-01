'use client'

import { Button } from '@/components/ui/button';
import Search from './Search';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function Home() {
  return (
    <>
      <main className='w-full'>
        <div>
          <h1 className='text-5xl'>All Our <span className='font-bold text-sapphire'>Contacts</span></h1>
          <p className='text-xl my-4'>Know those unknown numbers <br /> with one <span className='text-sapphire'>effortless</span> download</p>
        </div>
      </main>
      <Dialog>
        <DialogTrigger>
          <Button>Get started</Button>
        </DialogTrigger>
        <DialogContent>
          <Search />
        </DialogContent>
      </Dialog>
    </>
  );
}
