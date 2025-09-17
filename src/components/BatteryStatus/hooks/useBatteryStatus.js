import { useEffect, useState } from 'react';

const useBatteryStatus = () => {
  const [level, setLevel] = useState(null);
  const [charging, setCharging] = useState(null);

  useEffect(() => {
    let battery = null;
    let interval = null;

    const updateBattery = () => {
      if (battery) {
        setLevel(battery.level);
        setCharging(battery.charging);
      }
    };

    const setupBattery = (batt) => {
      battery = batt;
      updateBattery();

      if ('onlevelchange' in battery && 'onchargingchange' in battery) {

        const handleLevel = () => setLevel(battery.level);
        const handleCharging = () => setCharging(battery.charging);

        battery.addEventListener('levelchange', handleLevel);
        battery.addEventListener('chargingchange', handleCharging);

        return () => {
          battery.removeEventListener('levelchange', handleLevel);
          battery.removeEventListener('chargingchange', handleCharging);
        };
      } else {

        interval = setInterval(updateBattery, 10000);
        return () => clearInterval(interval);
      }
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((batt) => {
        const cleanup = setupBattery(batt);
        if (cleanup) {
          return cleanup;
        }
      });
    } else {
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, []);

  return { level, charging };
}
export default useBatteryStatus;