import React from 'react';
import { useGetAllTasks } from '../hooks';
import { Form } from './Form';
import { Section } from './Section';

export const TodoApp = () => {
  const { data, isLoading, isError, error } = useGetAllTasks();
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <div className='todo-app'>
      <Form />
      {data && <Section tasks={data?.tasks} />}
    </div>
  );
};
