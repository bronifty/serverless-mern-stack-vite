import React from 'react';
import { useFetchAll } from '../hooks';
import { Form } from './Form';
import { Section } from './Section';

export const TodoApp = () => {
  const { data, isLoading, isError, error } = useFetchAll();
  // console.log('in the TodoApp; data:', data);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }
  return (
    <div className='todo-app'>
      <Form />
      {data && <Section data={data} />}
      {/* {data && <Section tasks={data} />} */}
    </div>
  );
};
