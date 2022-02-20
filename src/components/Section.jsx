import { Task } from './Task';

export const Section = ({ data }) => {
  return (
    <section className='tasks-container'>
      <div className='tasks'>
        {data ? (
          data.map((task, idx) => <Task key={idx} {...task} />)
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </section>
  );
};
