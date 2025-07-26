import './notificationDialog.css';

const NotificationDialog = ({ title, message, type, onClose, btnTitle, onBtnClick }) => {
  const handleClose = () => {
    onClose(true);
  };

  if (!message && !title) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className={`dialog-box ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dialog-x" onClick={handleClose}>×</button>
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <button onClick={onBtnClick} className="dialog-close">{btnTitle}</button>
      </div>
    </div>
  );
};

export default NotificationDialog;
