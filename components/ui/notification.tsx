import ReactDOM from 'react-dom';
import classes from './notification.module.css';
import Notification from '../../models/notification';

function Notification({ title, message, status }: Notification) {
  let statusClasses = '';
  const modalRoot = document.getElementById('notifications') as HTMLElement;

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    modalRoot
  );
}

export default Notification;
