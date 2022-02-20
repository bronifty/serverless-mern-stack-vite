import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchOne, useUpdateOne, fetchAll } from '../hooks';
import { useQueryClient, useMutation } from 'react-query';

export const Edit = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading, isFetching, isError, error } = useFetchOne(id);
  //   const {
  //    data,
  //    error,
  //    isError,
  //    isIdle,
  //    isLoading,
  //    isPaused,
  //    isSuccess,
  //    mutate,
  //    mutateAsync,
  //    reset,
  //    status,
  //  } = useMutation(mutationFn, {

  console.log({ data, id });
  const mutation = useUpdateOne();
  // const { mutate: updateOne } = useUpdateOne();
  const [name, setName] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  React.useEffect(() => {
    setName(data?.name);
    setCompleted(data?.completed);
  }, [data]);

  const onUpdateTask = (e) => {
    e.preventDefault();
    mutation.mutate({
      id,
      name,
      completed,
    });
    console.log({ mutation });
  };

  return (
    <div className='container'>
      <form className='single-task-form' onSubmit={onUpdateTask}>
        <h4>Edit Task</h4>
        <div className='form-control'>
          <label>Task ID</label>
          <p className='task-edit-id'>{id}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            className='task-edit-name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='completed'>completed</label>
          <input
            type='checkbox'
            name='completed'
            checked={completed}
            className='task-edit-completed'
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type='submit' className='block btn task-edit-btn'>
          Update
        </button>
        <div className='form-alert'>
          {mutation.isError ? (
            <div>Error</div>
          ) : mutation.isSuccess ? (
            <div className='alert-success'>Success</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </form>
      <Link
        to='/'
        className='btn back-link'
        onMouseOver={() => {
          queryClient.prefetchQuery(['fetchAll'], () => fetchAll(), {
            staleTime: Infinity,
          });
        }}
      >
        Back to Tasks
      </Link>
    </div>
  );
};

export default Edit;
