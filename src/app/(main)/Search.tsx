'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showToastError } from '@/utils/toast';
import Link from 'next/link';

interface SearchProps {
  groupId?: string
}

const formSchema = z.object({
  groupId: z.string().length(8, { message: "Please enter an 8-digit ID" }),
  password: z.string().min(1, { message: "Password is required" })
})

export default function Search({ groupId }: SearchProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: groupId === 'search' ? '' : groupId,
      password: ''
    }
  })

  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { groupId, password } = values;
    setIsWaiting(true);

    try {
      const response = await signIn('credentials', {
        id: groupId,
        password: password,
        callbackUrl: `/${groupId}/add`,
        redirect: false,
      })

      if (response && response.status === 401) {
        showToastError("Group could not be found with the provided credentials.");
      } else if (response && response.ok) {
        router.push(`/${groupId}/add`);
      }
    } catch(error) {
      showToastError("An unexpected error occurred. Please try again later.");
    }

    setIsWaiting(false);
  }

  return (
    <div>
      <h2 className='text-3xl font-normal mb-4'>Let's find your group</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='groupId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group ID</FormLabel>
                <FormControl>
                  <Input placeholder='8 digit ID' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' size='wide' loading={isWaiting}>Search</Button>
          <Button variant='link' asChild>
            <Link href='/create'>Create a group</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
