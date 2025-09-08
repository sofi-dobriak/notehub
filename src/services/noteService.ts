import axios from 'axios';
import { FetchNotesHTTPResponse } from '../types/noteService';
import { CreateNote, Note } from '../types/note';

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    common: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  },
});

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesHTTPResponse> => {
  try {
    const response = await instance.get<FetchNotesHTTPResponse>(
      `/notes?search=${query}&page=${page}&perPage=12`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNote = async (note: CreateNote): Promise<Note> => {
  try {
    const response = await instance.post<Note>('/notes', note);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateNote = async (id: string, note: CreateNote): Promise<Note> => {
  try {
    const response = await instance.patch(`/notes/${id}`, note);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await instance.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
