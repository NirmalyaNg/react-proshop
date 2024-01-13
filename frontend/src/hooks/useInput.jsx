import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        touched: true,
      };
    case 'BLUR':
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const useInput = (initialValue, validate) => {
  const [state, stateDispatch] = useReducer(reducer, { value: initialValue, touched: false });
  const error = validate(state.value);
  const inValid = state.touched && error;

  const handleChange = (e) => {
    stateDispatch({
      type: 'CHANGE',
      payload: e.target.value,
    });
  };

  const handleBlur = () => {
    stateDispatch({
      type: 'BLUR',
    });
  };

  return {
    value: state.value,
    touched: state.touched,
    error,
    inValid,
    handleChange,
    handleBlur,
  };
};

export default useInput;
