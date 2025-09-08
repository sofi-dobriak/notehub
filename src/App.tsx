import { useEffect, useState } from 'react';
import css from './App.module.css';
import { useModal } from './hooks/useModal';
import Modal from './components/Modal/Modal';
import { CreateNote, NoteTag } from './types/note';
import { useMutations } from './hooks/useMutations';
import { useFetchNotes } from './hooks/useFetchNotes';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import SearchBox from './components/SearchBox/SearchBox';
import Pagination from './components/Pagination/Pagination';
import ConfirmModalContent from './components/ConfirmModalContent/ConfirmModalContent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from './components/Loader/Loader';
import { useMediaQueries } from './hooks/useMediaQueries';
import InfoMessage from './components/InfoMessage/InfoMessage';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [noteIdToEdit, setNoteIdToEdit] = useState('');
  const [noteIdToDelete, setNoteIdToDelete] = useState('');

  const { isMobile } = useMediaQueries();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { data, error, isError, isLoading } = useFetchNotes(query, page);
  const { mutationCreate, mutationUpdate, mutationDelete } = useMutations();

  const noteToEdit = data?.notes?.find(note => note.id === noteIdToEdit);

  const handleCreateNote = (title: string, content: string, tag: NoteTag) => {
    const newNote: CreateNote = { title, content, tag };
    mutationCreate.mutate(newNote);
    handleCloseModal('createModal');
  };

  const handleConfirmToUpdate = (noteId: string) => {
    if (!noteId) return;
    setNoteIdToEdit(noteId);
    handleOpenModal('editModal');
  };

  const handleUpdateNote = (id: string, title: string, content: string, tag: NoteTag) => {
    const updatedNote: CreateNote = { title, content, tag };
    mutationUpdate.mutate({ noteIdToEdit: id, note: updatedNote });
    handleCloseModal('editModal');
  };

  const handleConfirmNoteDelete = (noteId: string) => {
    if (!noteId) return;
    setNoteIdToDelete(noteId);
    handleOpenModal('confirmModal');
  };

  const handleDeleteNote = () => {
    mutationDelete.mutate(noteIdToDelete);
    handleCloseModal('confirmModal');
    setNoteIdToDelete('');
  };

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
      duration: 1000,
    });
  }, []);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {!isMobile && <SearchBox query={query} setQuery={setQuery} />}

        <a href='../index.html' className={css.logoLink}>
          NoteHub
        </a>

        <button
          className={css.button}
          onClick={() => handleOpenModal('createModal')}
          aria-label='Create a note'
        >
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <Loader />}
        {isMobile && <SearchBox query={query} setQuery={setQuery} />}

        {data && (
          <NoteList
            notes={data?.notes}
            confirmDelete={handleConfirmNoteDelete}
            editNote={handleConfirmToUpdate}
          />
        )}

        {data && <Pagination totalPages={data?.totalPages} page={page} setPage={setPage} />}
        {isError && <InfoMessage>Something went wrong {error?.message}</InfoMessage>}
        {data?.notes.length === 0 && <InfoMessage>No matching list of notes</InfoMessage>}
      </main>

      {isModalOpen('createModal') && (
        <Modal onClose={() => handleCloseModal('createModal')} isOpen={isModalOpen('createModal')}>
          <NoteForm onClose={() => handleCloseModal('createModal')} onCreate={handleCreateNote} />
        </Modal>
      )}

      {isModalOpen('editModal') && (
        <Modal onClose={() => handleCloseModal('editModal')} isOpen={isModalOpen('editModal')}>
          <NoteForm
            onClose={() => handleCloseModal('editModal')}
            onUpdate={handleUpdateNote}
            editNote={noteToEdit}
          />
        </Modal>
      )}

      {isModalOpen('confirmModal') && (
        <Modal
          onClose={() => handleCloseModal('confirmModal')}
          isOpen={isModalOpen('confirmModal')}
        >
          <ConfirmModalContent onClose={handleCloseModal} onDelete={handleDeleteNote} />
        </Modal>
      )}
    </div>
  );
}

export default App;
