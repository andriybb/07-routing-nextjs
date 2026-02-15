import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api"; 


export default async function NotesPage() {
  const queryClient = new QueryClient();


  const initialTopic = "";
  const initialPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialTopic, initialPage],
    queryFn: () => fetchNotes(initialTopic, initialPage),
  });

  return (
    <>
      <Toaster />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </>
  );
}