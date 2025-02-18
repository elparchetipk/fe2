// src/components/animations/AnimatedContainer.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Este componente servirá como contenedor base para elementos animados
const AnimatedContainer = ({
  children,
  animation = 'fade',
  duration = 0.3,
  delay = 0
}) => {
  // Definimos diferentes tipos de animaciones predeterminadas
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 }
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 }
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      initial={selectedAnimation.initial}
      animate={selectedAnimation.animate}
      exit={selectedAnimation.exit}
      transition={{
        duration,
        delay,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;