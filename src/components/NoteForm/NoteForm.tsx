import css from './NoteForm.module.css';
import { Note, NoteTag } from '../../types/note';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

interface NoteFormProps {
  onClose: () => void;
  onCreate?: (title: string, content: string, tag: NoteTag) => void;
  onUpdate?: (id: string, title: string, content: string, tag: NoteTag) => void;
  editNote?: Note;
}

interface FormInitialValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required field'),
  content: Yup.string().max(100, 'Max 100 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid value')
    .required('Required field'),
});

const NoteForm = ({ onClose, onCreate, onUpdate, editNote }: NoteFormProps) => {
  const isEditMode = !!editNote;

  const initialValues: FormInitialValues = {
    title: editNote?.title || '',
    content: editNote?.content || '',
    tag: editNote?.tag || 'Todo',
  };

  const handleSubmit = (values: FormInitialValues, actions: FormikHelpers<FormInitialValues>) => {
    if (!values) return;

    if (!editNote && onCreate) {
      onCreate(values.title, values.content, values.tag);
    } else if (isEditMode && editNote?.id && onUpdate) {
      onUpdate(editNote.id, values.title, values.content, values.tag);
    }

    actions.resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor='title'>Title</label>
          <Field id='title' type='text' name='title' className={css.input} />
          <ErrorMessage name='title' className={css.error} component='span' />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='content'>Content</label>
          <Field as='textarea' id='content' name='content' rows={8} className={css.textarea} />
          <ErrorMessage name='content' className={css.error} component='span' />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='tag'>Tag</label>
          <Field as='select' id='tag' name='tag' className={css.select}>
            <option value='Todo'>Todo</option>
            <option value='Work'>Work</option>
            <option value='Personal'>Personal</option>
            <option value='Meeting'>Meeting</option>
            <option value='Shopping'>Shopping</option>
          </Field>
          <ErrorMessage name='tag' className={css.error} component='span' />
        </div>

        <div className={css.actions}>
          <button
            onClick={onClose}
            type='button'
            className={css.cancelButton}
            aria-label='Close create/update modal form'
          >
            Cancel
          </button>
          <button type='submit' className={css.submitButton} aria-label='Create/update a note'>
            {isEditMode ? 'Update note' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
