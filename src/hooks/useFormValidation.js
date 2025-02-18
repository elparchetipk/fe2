// src/hooks/useFormValidation.js
import { useState, useCallback } from 'react';

const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation function that checks all rules
  const validate = useCallback((fieldValues = values) => {
    let tempErrors = {};

    Object.keys(validationRules).forEach(key => {
      const value = fieldValues[key];
      const rules = validationRules[key];

      if (rules.required && !value) {
        tempErrors[key] = 'Este campo es requerido';
      } else if (rules.pattern && !rules.pattern.test(value)) {
        tempErrors[key] = rules.message || 'Formato inválido';
      } else if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) tempErrors[key] = customError;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [validationRules, values]);

  return {
    values,
    setValues,
    errors,
    touched,
    setTouched,
    validate,
    isValid: Object.keys(errors).length === 0
  };
};

export default useFormValidation;