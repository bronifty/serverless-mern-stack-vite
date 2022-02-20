import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchOne, useUpdateOne, fetchAll } from '../hooks';
import { useQueryClient } from 'react-query';

export const Edit = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading, isFetching, isError, error } = useFetchOne(id);
  console.log({ data, id });
  const { mutate: updateOne } = useUpdateOne();
  const [name, setName] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  React.useEffect(() => {
    setName(data?.name);
    setCompleted(data?.completed);
  }, [data]);

  const onUpdateTask = (e) => {
    e.preventDefault();
    updateOne({ id, name, completed });
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
        <div className='form-alert'></div>
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
