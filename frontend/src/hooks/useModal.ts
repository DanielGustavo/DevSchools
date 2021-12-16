import { useState } from 'react';

interface ModalsState {
  [modalName: string]: {
    open: boolean;
    data?: any;
  };
}

export default function useModal(modals: string[]) {
  const uniqueModals = new Set(modals);

  const initModalsState = {} as ModalsState;

  uniqueModals.forEach((modal) => {
    initModalsState[modal] = {
      open: false,
    };
  });

  const [modalsState, setModalsState] = useState(initModalsState);

  function closeModal(modalName: string) {
    setModalsState({
      ...modalsState,
      [modalName]: { open: false, data: undefined },
    });
  }

  function openModal(modalName: string, data?: any) {
    setModalsState({ ...modalsState, [modalName]: { open: true, data } });
  }

  return {
    modals: modalsState,
    closeModal,
    openModal,
  };
}
