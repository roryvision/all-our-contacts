import { supabase } from '@/lib/supabase';

export async function POST(
  req: Request, 
  { params }: { params: { groupId: string } }
) {
  try {
    const { groupId } = params;
    const { name, password } = await req.json();

    const { error } = await supabase
      .from('group')
      .insert({ groupId, name, password })
      .select();

    if (error) {
      throw new Error('Failed to add contact');
    }

    return new Response('Successfully added contact', { status: 201 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
