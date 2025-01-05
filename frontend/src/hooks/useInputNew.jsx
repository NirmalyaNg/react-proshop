import { useEffect, useState } from 'react';

const useInputNew = (initialValue, validate) => {
  const [value, setValue] = useState(initialValue ?? '');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorMessage = validate(value);
    setError(errorMessage);
  }, [value, validate]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleReset = () => {
    setValue(initialValue);
    setTouched(false);
  };

  return {
    value,
    touched,
    error,
    handleChange,
    handleBlur,
    handleReset,
  };
};

export default useInputNew;
