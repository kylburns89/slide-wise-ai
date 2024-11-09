import { Suspense } from 'react';
import { PresentationEditor } from '@/components/presentation-editor';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { mockPresentations } from '@/lib/mock-data';

export default function PresentationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PresentationEditor presentationId={params.id} />
    </Suspense>
  );
}