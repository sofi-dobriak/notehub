import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNote } from '../types/note';
import { createNote, deleteNote, updateNote } from '../services/noteService';
import toast from 'react-hot-toast';

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: async (note: CreateNote) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note successfully created');
    },
    onError: error => {
      toast.error(`Failed to create note. ${error?.message}`);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({ noteIdToEdit, note }: { noteIdToEdit: string; note: CreateNote }) =>
      updateNote(noteIdToEdit, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note successfully updated');
    },
    onError: error => {
      toast.error(`Failed to create note. ${error?.message}`);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note successfully deleted');
    },
    onError: error => {
      toast.error(`Failed to delete note. ${error?.message}`);
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
};
