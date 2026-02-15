"use client";
import css from "./page.module.css";
import { useState} from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient(
  
) {

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedTopic, setDebouncedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 

  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedTopic(value);
    setCurrentPage(1); 
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value); 
    updateSearch(value);   
  };

  const { data, isFetching, isLoading} = useQuery({
    queryKey: ["notes", debouncedTopic, currentPage],
    queryFn: () => fetchNotes(debouncedTopic, currentPage),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);




  return (
    <><div className={css.app}>
        
        
    <div className={css.toolbar}>
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
      
     
      
      {totalPages > 1 && (
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    )}
      <button className={css.button} onClick={handleOpenModal}>Create note +</button>
    </div>
  
    <main className={css.mainContent} style={{ position: 'relative' }}>
        

        {isFetching && !isLoading && (
          <div className={css.fetchingOverlay}>Оновлення...</div>
        )}

 
        {isLoading ? (
          <div className={css.spinnerContainer}>
            <div className={css.spinner}></div>
            <p>Завантажуємо ваші нотатки...</p>
          </div>
        ) : (
          <>
            {notes.length > 0 ? (
              <NoteList notes={notes} />
            ) : (
              <p className={css.empty}>Нотаток не знайдено</p>
            )}
          </>
        )}
      </main>
    {isModalOpen && (
<Modal onClose={handleCloseModal}>
<NoteForm onClose={handleCloseModal} />
</Modal>
)}
    </div>
    
    </>
  );
}
