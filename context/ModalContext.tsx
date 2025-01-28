import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;

  // alertModal
  openAlertModal: () => void;
  closeAlertModal: () => void;
  isAlertModalVisible: boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAlertModalVisible, setAlertModalVisible] = useState(false);
  //form update user profile
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openAlertModal = () => setAlertModalVisible(true);
  const closeAlertModal = () => setAlertModalVisible(false);

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        openModal,
        closeModal,
        openAlertModal,
        closeAlertModal,
        isAlertModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
