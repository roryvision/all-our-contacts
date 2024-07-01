'use client'

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showToastError } from '@/utils/toast';
import { generateId } from '@/utils/generate';

const formSchema = z.object({
  groupName: z.string()
    .min(1, { message: "Name is required" })
    .max(32, { message: "Cannot exceed 32 characters" }),
  password: z.string().min(8, { message: "A password with at least 8 characters is required" })
})

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { groupName, password } = values;
    const groupId: string = generateId();

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
          id: groupId,
          name: groupName,
          password: password,
        })
      })

      if (response.ok) {
        router.push(`/${groupId}/add`);
      } else {
        showToastError("Sorry, we couldn't create your group due to an error on our end.");
      }
    } catch (error) {
      showToastError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='groupName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder='All Our Contacts' {...field} />
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
        <Button type='submit'>Create</Button>
      </form>
    </Form>
  )
}
