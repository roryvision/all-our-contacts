'use client'

import { Button } from '@/components/ui/button';
import Search from './Search';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Home() {
  return (
    <>
      <div>all our contacts</div>
      <Dialog>
        <DialogTrigger>
          <Button>Get started</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let's find your group</DialogTitle>
          </DialogHeader>
          <Search groupId='' />
        </DialogContent>
      </Dialog>
    </>
  );
}
