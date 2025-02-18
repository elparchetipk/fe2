// src/components/Notifications/NotificationSystem.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';

const NotificationSystem = () => {
  const { notifications } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <Notification
              message={message}
              type={type}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Notification = ({ message, type }) => {
  // Definimos diferentes estilos según el tipo de notificación
  const styles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <motion.div
      className={`${styles[type]} text-white px-6 py-3 rounded-lg shadow-lg`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {message}
    </motion.div>
  );
};

export default NotificationSystem;