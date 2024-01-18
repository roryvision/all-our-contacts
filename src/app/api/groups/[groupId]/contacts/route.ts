import { supabase } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;
  
  const { data, error } = await supabase
    .from('contact')
    .select()
    .eq('group_id', groupId);

  return Response.json(data);
}

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;
  const { first, last, phone } = await req.json();

  const { data, error } = await supabase
    .from('contact')
    .insert({
      first_name: first,
      last_name: last,
      phone,
      group_id: groupId,
    })
    .select();

  return Response.json(data);
}
