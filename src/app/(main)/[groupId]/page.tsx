'use client'

import { FC } from 'react';
import Search from '../Search';

interface PageProps {
  params: {
    groupId: string,
  }
}

const Page: FC<PageProps> = ({ params }) => {
  const { groupId } = params;

  return (
    <Search groupId={groupId} />
  )
}

export default Page;
