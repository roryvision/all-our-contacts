'use client'

import Search from '../Search';

interface PageProps {
  params: {
    groupId: string,
  }
}

export default function Page({ params }: PageProps) {
  const { groupId } = params;

  return (
    <Search groupId={groupId} />
  )
}
