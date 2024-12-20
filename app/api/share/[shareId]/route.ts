import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { shareId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data: image, error } = await supabase
    .from('images')
    .select('*')
    .eq('share_id', params.shareId)
    .eq('is_public', true)
    .single();

  if (error || !image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  return NextResponse.json(image);
}
