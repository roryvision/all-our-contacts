'use client'

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showToastError } from '@/utils/toast';

interface PageProps {
  params: {
    groupId: string,
  }
}
const formSchema = z.object({
  firstName: z.string()
    .min(1, { message: "Name is required" })
    .max(200, { message: "Cannot exceed 200 characters" }),
  lastName: z.string().max(200, { message: "Cannot exceed 200 characters" }).optional(),
  phoneNumber: z.string()
    .min(4, { message: "Phone number is required" })
    .max(15, { message: "Cannot exceed 15 digits" })
})

export default function Page({ params }: PageProps) {
  const { groupId } = params;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    }
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, phoneNumber } = values;

    try {
      const response = await fetch(`/api/groups/${groupId}/contacts`, {
        method: 'POST',
        body: JSON.stringify({
          first: firstName,
          last: lastName,
          phone: phoneNumber,
        })
      })

      if (response.ok) {
        router.push(`/${groupId}/download`);
      } else {
        showToastError("Sorry, we couldn't add your contact due to an error on our end.");
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
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='XXXXXXXXXX' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add to group</Button>
        <Button onClick={() => router.push(`/${groupId}/download`)}>Skip to download</Button>
      </form>
    </Form> 
  )
}
