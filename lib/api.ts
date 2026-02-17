import axios from "axios";
import type { Note, NoteTag } from "@/types/note";


export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
const NEXT_PUBLIC_API_BASE_URL = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(
  search: string,
  page: number,
): Promise<NoteResponse> {
  const response = await axios.get<NoteResponse>(`${NEXT_PUBLIC_API_BASE_URL}`, {
    params: {
      search,
      page,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function createNote(
  title: string,
  content: string,
  tag: string,
): Promise<Note> {
  const response = await axios.post<Note>(
    `${NEXT_PUBLIC_API_BASE_URL}`,
    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${NEXT_PUBLIC_API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id:string): Promise<Note> {
    const response = await axios.get<Note>(
        `${NEXT_PUBLIC_API_BASE_URL}/${id}`,
        {

            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        },
    );

    return response.data;}

    export async function fetchNoteByTag(tag: NoteTag): Promise<Note[]> {
        const response = await axios.get<NoteResponse>(
          `${NEXT_PUBLIC_API_BASE_URL}?tag=${tag}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
          }
        );
        return response.data.notes; // ← змінити з response.data на response.data.notes
      }
      
      export async function fetchAllNotes(): Promise<Note[]> {
        const response = await axios.get<NoteResponse>(
          `${NEXT_PUBLIC_API_BASE_URL}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
          }
        );
        return response.data.notes;
      }
