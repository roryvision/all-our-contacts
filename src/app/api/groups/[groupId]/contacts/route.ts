import { supabase } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { groupId } = params;
    
    const { data, error } = await supabase
      .from('contact')
      .select()
      .eq('group_id', groupId);

    if (error) {
      console.log(error);
      throw new Error('Failed to fetch contacts');
    }

    if (!data) {
      return new Response('No contacts were found', { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { groupId } = params;
    const { first, last, phone } = await req.json();

    const { error } = await supabase
      .from('contact')
      .insert({
        first_name: first,
        last_name: last,
        phone,
        group_id: groupId,
      })
      .select();

    if (error) {
      console.log(error);
      throw new Error('Failed to add contact');
    }

    return new Response('Successfully added contact', { status: 201 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
