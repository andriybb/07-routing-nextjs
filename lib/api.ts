'use client'
import axios from 'axios';
import  Note from "@/types/note";

interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(search: string, page: number): Promise<NoteResponse> {
    const response = await axios.get<NoteResponse>(
        'https://notehub-public.goit.study/api/notes',
        {
            params: {
                search,
                page,
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        },
    );

    return response.data;
};



export async function createNote(title: string, content: string, tag: string): Promise<Note> {
    const response = await axios.post<Note>(
        'https://notehub-public.goit.study/api/notes',
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
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        },
    );
    return response.data;
}

export async function fetchNoteById(id:string): Promise<Note> {
    const response = await axios.get<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
          
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        },
    );

    return response.data;
};