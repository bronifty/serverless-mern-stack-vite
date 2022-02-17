import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchItem, useUpdateItem } from '../hooks';

export const Edit = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError, error } = useFetchItem(id);
  const { mutate: updateItem } = useUpdateItem();
  const [name, setName] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  React.useEffect(() => {
    setName(data?.task?.name);
    setCompleted(data?.task?.completed);
  }, [data]);

  const onUpdateTask = (e) => {
    e.preventDefault();
    updateItem({ id, name, completed });
  };

  // editFormDOM.addEventListener('submit', async (e) => {
  //   editBtnDOM.textContent = 'Loading...';
  //   e.preventDefault();
  //   try {
  //     const taskName = taskNameDOM.value;
  //     const taskCompleted = taskCompletedDOM.checked;

  //     const {
  //       data: { task },
  //     } = await axios.patch(`/api/v1/tasks/${id}`, {
  //       name: taskName,
  //       completed: taskCompleted,
  //     });

  //     const { _id: taskID, completed, name } = task;

  //     taskIDDOM.textContent = taskID;
  //     taskNameDOM.value = name;
  //     taskCompletedDOM.checked = completed;
  //     tempName = name;
  //     formAlertDOM.style.display = 'block';
  //     formAlertDOM.textContent = `success, edited task`;
  //     formAlertDOM.classList.add('text-success');
  //   } catch (error) {
  //     console.error(error);
  //     taskNameDOM.value = tempName;
  //     formAlertDOM.style.display = 'block';
  //     formAlertDOM.innerHTML = `error, please try again`;
  //   }
  //   editBtnDOM.textContent = 'Edit';
  //   setTimeout(() => {
  //     formAlertDOM.style.display = 'none';
  //     formAlertDOM.classList.remove('text-success');
  //   }, 3000);
  // });

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
      <Link to='/' className='btn back-link'>
        Back to Tasks
      </Link>
    </div>
  );
};

export default Edit;
