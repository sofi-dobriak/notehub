import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import React, { useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={clsx(css.backdrop, isOpen && css.isOpen)}
      role='dialog'
      aria-modal='true'
    >
      <div className={css.modal} data-aos='zoom-in' data-aos-duration='300'>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
