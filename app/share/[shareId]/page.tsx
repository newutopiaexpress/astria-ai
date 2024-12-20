import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function SharePage({ params }: { params: { shareId: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: image, error } = await supabase
    .from('images')
    .select('*')
    .eq('share_id', params.shareId)
    .eq('is_public', true)
    .single();

  if (error) {
    console.error('Error fetching shared image:', error);
    notFound();
  }

  if (!image) {
    console.error('No image found with share_id:', params.shareId);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <img 
          src={image.uri} 
          alt="Shared AI generated image"
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
}
