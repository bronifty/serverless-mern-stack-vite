import { Link } from 'react-router-dom';
import { FaTrashAlt, FaRegCheckCircle, FaRegEdit } from 'react-icons/fa';
import { useDeleteItem } from '../hooks';

export const Task = ({ completed, _id: taskID, name }) => {
  const { mutate: deleteItem } = useDeleteItem();
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
        <Link to={`/tasks/${taskID}`} className='edit-link'>
          <FaRegEdit />
        </Link>

        <button className='delete-btn' onClick={() => deleteItem(taskID)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};
