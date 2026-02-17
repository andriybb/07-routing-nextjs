'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNoteByTag, fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';
import { useParams } from 'next/navigation';
import type { Note } from '@/types/note';

const NotesByCategory = () => {
  const params = useParams();
  const tag = (params?.slug?.[0]) as NoteTag;


  const { data, isLoading } = useQuery<Note[]>({
    queryKey: ['notes', tag],
    queryFn: () => tag 
  ? fetchNoteByTag(tag) 
  : fetchNotes("", 1).then(res => res.notes),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const note = data ?? [];

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