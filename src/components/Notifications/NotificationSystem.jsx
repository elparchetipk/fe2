// src/components/Notifications/NotificationSystem.jsx
import React from 'react';
import { useUI } from '../../context/UIContext';

const NotificationSystem = () => {
  const { notifications } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(({ id, message, type }) => (
        <Notification
          key={id}
          message={message}
          type={type}
        />
      ))}
    </div>
  );
};

const Notification = ({ message, type }) => {
  // Estilos según el tipo de notificación
  const styles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div
      className={`${styles[type]} text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}
    >
      {message}
    </div>
  );
};

export default NotificationSystem;