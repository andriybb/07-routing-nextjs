"use client";

import { use } from "react";
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreviewContent from '@/components/NotePreview/NotePreview'; 

type Props = {
  params: Promise<{ id?: string }>;
};

export default function NotePreviewPage({ params }: Props) {
  const router = useRouter();
  

  const { id } = use(params);
  
  const close = () => router.back();

  return (
    <Modal onClose={close}>    

{id && <NotePreviewContent id={id} />}
    </Modal>
  );
}