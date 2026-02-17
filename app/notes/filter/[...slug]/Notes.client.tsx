'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNoteByTag } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';
import { useParams } from 'next/navigation';
import type { Note } from '@/types/note';
interface NoteListProps {
  notes: Note[];
}
const NotesByCategory = ({ notes }: NoteListProps) => {
  const params = useParams();
  const tag = (params?.slug?.[0]) as NoteTag;


  const { data, isLoading } = useQuery<Note>({
    queryKey: ['notes', tag],
    queryFn: () => fetchNoteByTag(tag),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const note = data?.notes ?? [];

  return (
    <div>
      <h1>Список Нотаток за фільтром - {tag}</h1>
      {isLoading && <p>Завантаження...</p>}
      {note.length > 0 ? (
        <NoteList notes={note} />
      ) : (
        <p>Нотаток не знайдено</p>
      )}
    </div>
  );
};

export default NotesByCategory;