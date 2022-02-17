import { Task } from './Task';

export const Section = ({ tasks }) => {
  return (
    <section className='tasks-container'>
      <div className='tasks'>
        {tasks ? (
          tasks.map((task, idx) => <Task key={idx} {...task} />)
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </section>
  );
};
