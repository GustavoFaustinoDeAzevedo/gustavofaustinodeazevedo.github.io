import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState('00:00<br />00/00/0000');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).padStart(2, '0');
      setTime(`${hours}:${minutes}<br />${day}/${month}/${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="clock" dangerouslySetInnerHTML={{ __html: time }} />;
};

export default Clock;
