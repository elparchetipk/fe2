// src/context/AccessibilityContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    reduceMotion: false,
    highContrast: false,
    fontSize: 'medium', // small, medium, large
    keyboardMode: false
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));

    // Guardamos las preferencias en localStorage
    localStorage.setItem('accessibility-preferences', JSON.stringify({
      ...preferences,
      [key]: value
    }));
  };

  return (
    <AccessibilityContext.Provider value={{
      preferences,
      updatePreference
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);