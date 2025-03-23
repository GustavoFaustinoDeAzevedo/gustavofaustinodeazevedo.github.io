import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="clock">{time}</span>;
};

export default Clock;
