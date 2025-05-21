import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteTask } from '../redux/tasksSlice';

import '../styles/TaskDetails.css';

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === id)
  );

  if (!task) return <p className="not-found">Task not found</p>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      navigate('/');
    }
  };

  const renderTags = () => {
    if (Array.isArray(task.tags) && task.tags.length > 0) {
      return task.tags.join(', ');
    }
    return 'None';
  };

  return (
    <div className="details-container">
      <h1 className="details-title">{task.title}</h1>
      <div className="details-info">
        <p><strong>Description:</strong> {task.description || 'N/A'}</p>
        <p><strong>Due Date:</strong> {task.dueDate || 'N/A'}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Tags:</strong> {renderTags()}</p>
      </div>
      <div className="details-actions">
        <button onClick={() => navigate(`/edit/${task.id}`)} className="btn btn-warning">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskDetails;
