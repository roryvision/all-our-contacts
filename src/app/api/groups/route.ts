import { supabase } from '@/lib/supabase';

export async function POST(
  req: Request,
) {
  try {
    const { id, name, password } = await req.json();

    const { error } = await supabase
      .from('group')
      .insert({ 
        id,
        name, 
        password 
      })
      .select();

    if (error) {
      console.log(error);
      throw new Error('Failed to create group');
    }

    return new Response('Successfully created group', { status: 201 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
