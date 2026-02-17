import NotePreviewPage from "./NotePreview.client";
interface NoteModalProps {
    params: Promise<{
      id: string;
    }>;
  }
export default async function NoteModal({ params }: NoteModalProps) {
    const { id } = await params;
    return (
      <NotePreviewPage params={Promise.resolve({ id })}/>
    );
  }