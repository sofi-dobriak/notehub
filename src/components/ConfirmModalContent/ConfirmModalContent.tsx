import css from './ConfirmModalContent.module.css';

interface ConfirmModalContentProps {
  onClose: (id: string) => void;
  onDelete: () => void;
}

const ConfirmModalContent = ({ onClose, onDelete }: ConfirmModalContentProps) => {
  return (
    <>
      <h2 className={css.confirmTitle}>Are you sure?</h2>
      <div className={css.confirmButtonContainer}>
        <button
          onClick={() => onClose('confirmModal')}
          className={css.cancelButton}
          aria-label='Close modal window'
        >
          Close
        </button>
        <button onClick={onDelete} className={css.deleteButton} aria-label='Delete a note'>
          Delete
        </button>
      </div>
    </>
  );
};

export default ConfirmModalContent;
