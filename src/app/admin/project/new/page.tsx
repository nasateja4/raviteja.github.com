import { Suspense } from 'react';
import ProjectForm from '@/components/ProjectForm';

export default function NewProjectPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 font-medium">Loading form...</div>}>
      <ProjectForm isEditing={false} />
    </Suspense>
  );
}
