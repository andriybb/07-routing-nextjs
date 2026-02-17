'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
  tag?: NoteTag;
}

const NotesByCategory = ({ tag }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // скидаємо сторінку при новому пошуку
  };

  return (
    <div>
      <h1>Список Нотаток {tag ? `за фільтром - ${tag}` : ''}</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Пошук нотаток..."
      />

      <button onClick={() => setIsModalOpen(true)}>
        Створити нотатку
      </button>

      {isModalOpen && (
        // твій компонент модального вікна для створення нотатки
        <div>
          {/* <CreateNoteModal onClose={() => setIsModalOpen(false)} /> */}
        </div>
      )}

      {isLoading && <p>Завантаження...</p>}

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <p>Нотаток не знайдено</p>
      )}

      {totalPages > 1 && (
        <div>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            Назад
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesByCategory;