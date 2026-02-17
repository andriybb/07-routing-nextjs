"use client";

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';

export default function NotePreviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка завантаження нотатки</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <span>{note.tag}</span>
        </div>
      )}
    </Modal>
  );
}