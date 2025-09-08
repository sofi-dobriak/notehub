import { useState } from 'react';

type OpenModalsState = Record<string, boolean>;

export const useModal = () => {
  const [openModal, setOpenModal] = useState<OpenModalsState>({});

  const handleOpenModal = (modalId: string) => {
    setOpenModal(prev => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const handleCloseModal = (modalId: string) => {
    setOpenModal(prev => ({
      ...prev,
      [modalId]: false,
    }));
  };

  const isModalOpen = (modalId: string) => {
    return !!openModal[modalId];
  };

  return { isModalOpen, handleOpenModal, handleCloseModal };
};
