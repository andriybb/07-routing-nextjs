// app/notes/filter/[...slug]/page.tsx
import { fetchNoteByTag } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] as NoteTag;

  const response = await fetchNoteByTag(tag);

  return (
    <div>
      <h1>Список Нотаток за фільтром - {tag}</h1>
      {response?.notes?.length > 0 ? (
        <NoteList notes={response.notes} />
      ) : (
        <p>Нотаток не знайдено</p>
      )}
    </div>
  );
};

export default NotesByCategory;