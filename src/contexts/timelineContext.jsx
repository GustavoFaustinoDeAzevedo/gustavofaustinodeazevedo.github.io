import { createContext, useContext, useRef } from 'react';

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const timelines = useRef(new Map());

  const register = (id, timeline) => {
    timelines.current.set(id, timeline);
  };

  const get = (id) => timelines.current.get(id);

  return (
    <TimelineContext.Provider value={{ register, get }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => useContext(TimelineContext);
