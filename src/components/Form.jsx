import React from 'react';
import { useAddOne } from '../hooks';
const defaultValues = {
  name: '',
  completed: false,
};
export const Form = () => {
  const addItemMutation = useAddOne();
  const [show, toggle] = React.useReducer((d) => !d, false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addItemMutation.mutate(e.target.name.value);
    toggle();
    e.target.name.value = '';
    setTimeout(() => {
      toggle();
    }, 3000);
  };
  return (
    <form className='task-form' onSubmit={(e) => handleSubmit(e)}>
      <h4>task manager</h4>
      <div className='form-control'>
        <input
          type='text'
          name='name'
          className='task-input'
          placeholder='e.g. wash dishes'
        />
        <button type='submit' className='btn submit-btn'>
          {show && addItemMutation.isError
            ? 'Error'
            : show && addItemMutation.isSuccess
            ? 'Saved'
            : addItemMutation.isLoading
            ? 'Saving...'
            : 'Add Task'}
        </button>
      </div>

      {show && addItemMutation.isSuccess ? (
        <div className='form-alert text-success'>Success</div>
      ) : show && addItemMutation.isError ? (
        <div className='form-alert'>Error</div>
      ) : (
        <div className='form-alert text-success'>&nbsp;</div>
      )}
      {/* {show && addItemMutation.isError && (
        <div className='form-alert'>Error</div>
      )} */}
    </form>
  );
};
