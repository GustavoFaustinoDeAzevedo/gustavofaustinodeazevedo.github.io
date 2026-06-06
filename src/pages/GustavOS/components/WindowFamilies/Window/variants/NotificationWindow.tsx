import React, { useEffect } from 'react';

type NotificationWindowProps = {
  id: string;
  message: string;
  duration?: number;
  onClose: () => void;
};

const NotificationWindow = ({
  id,
  message,
  duration = 3000,
  onClose,
}: NotificationWindowProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification-window" id={id}>
      <span>{message}</span>
    </div>
  );
};

export default NotificationWindow;
