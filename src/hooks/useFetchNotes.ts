import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../services/noteService';

export const useFetchNotes = (query: string, page: number) => {
  return useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });
};
