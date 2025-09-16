import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/GlobalStyles/components/Icon';
import useBatteryStatus from '../hooks/useBatteryStatus';
import BatteryStatusStyled from './BatteryStatusStyled';
import BatteryStatusTextStyled from './BatteryStatusTextStyled';

const BatteryStatus = () => {
  const { level, charging } = useBatteryStatus();
  const batteryStatusIcon = {
    100: 'battery-100',
    75: 'battery-75',
    50: 'battery-50',
    25: 'battery-25',
    0: 'battery-0',
    charging: 'battery-charging',
  };

  const batteryLevel = charging
    ? 'charging'
    : Math.floor((level * 100) / 25) * 25;

  const batteryStatusIconKey = batteryStatusIcon[batteryLevel] || 'battery-0';

  return (
    level && (
      <BatteryStatusStyled>
        <Icon
          variant={batteryStatusIconKey}
          style={{ width: '1.5rem', height: '1rem' }}
        />
        <BatteryStatusTextStyled>
          {Math.round(level * 100)}%
        </BatteryStatusTextStyled>
      </BatteryStatusStyled>
    )
  );
};

export default BatteryStatus;
