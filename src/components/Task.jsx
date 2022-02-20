import { Link } from 'react-router-dom';
import { FaTrashAlt, FaRegCheckCircle, FaRegEdit } from 'react-icons/fa';
import { useDeleteOne } from '../hooks';
import { useQueryClient } from 'react-query';

export const Task = ({ completed, _id: taskID, name }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteOne } = useDeleteOne();
  return (
    <div className={`single-task ${completed && 'task-completed'}`}>
      <h5>
        {completed && (
          <span>
            <FaRegCheckCircle />
          </span>
        )}
        {name}
      </h5>
      <div className='task-links'>
        <Link
          to={`/tasks/${taskID}`}
          className='edit-link'
          onMouseOver={() => {
            queryClient.prefetchQuery(['fetchOne', taskID], () => fetchAll(), {
              staleTime: Infinity,
            });
          }}
        >
          <FaRegEdit />
        </Link>

        <button className='delete-btn' onClick={() => deleteOne(taskID)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};
