import { supabase } from '@/lib/supabase';

export async function POST(
  req: Request, 
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;
  const { name, password } = await req.json();

  const { data, error } = await supabase
    .from('group')
    .insert({ groupId, name, password })
    .select();

  return Response.json(data);
}
