import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  isProductModalVisible: boolean;
  openProductModal: () => void;
  closeProductModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProductModalVisible, setProductModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openProductModal = () => setProductModalVisible(true);
  const closeProductModal = () => setProductModalVisible(false);

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        openModal,
        closeModal,
        openProductModal,
        closeProductModal,
        isProductModalVisible,
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
