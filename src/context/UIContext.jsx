// src/context/UIContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Estado para gestionar múltiples modales
  const [modals, setModals] = useState({});
  // Estado para gestionar la cola de notificaciones
  const [notifications, setNotifications] = useState([]);

  // Función para mostrar un modal
  const showModal = useCallback((id, modalConfig) => {
    setModals(prev => ({
      ...prev,
      [id]: { ...modalConfig, isOpen: true }
    }));
  }, []);

  // Función para cerrar un modal
  const hideModal = useCallback((id) => {
    setModals(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  }, []);

  // Función para mostrar una notificación
  const showNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };

    setNotifications(prev => [...prev, notification]);

    // Eliminamos la notificación después de 5 segundos
    setTimeout(() => {
      setNotifications(prev =>
        prev.filter(item => item.id !== id)
      );
    }, 5000);
  }, []);

  return (
    <UIContext.Provider value={{
      modals,
      showModal,
      hideModal,
      notifications,
      showNotification
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);