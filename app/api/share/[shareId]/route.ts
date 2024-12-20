import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { shareId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  console.log('API Route - Share ID:', params.shareId);

  // First, let's check if the image exists without any conditions
  const { data: image, error } = await supabase
    .from('images')
    .select('*')
    .eq('share_id', params.shareId)
    .single();

  console.log('Query result:', { image, error });

  if (error || !image) {
    return NextResponse.json({ 
      error: 'Image not found', 
      details: error,
      shareId: params.shareId,
      timestamp: new Date().toISOString()
    }, { status: 404 });
  }

  return NextResponse.json(image);
}
