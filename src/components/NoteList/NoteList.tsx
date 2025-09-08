import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  confirmDelete: (id: string) => void;
  editNote: (id: string) => void;
}

const NoteList = ({ notes, confirmDelete, editNote }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem} data-aos='fade-up'>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <div className={css.buttonContainer}>
              <button
                onClick={() => editNote(id)}
                className={`${css.button} ${css.edit}`}
                aria-label='Edit a note'
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(id)}
                className={css.button}
                aria-label='Delete a note'
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
