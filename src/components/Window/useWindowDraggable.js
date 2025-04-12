// File: components/useWindowDraggable.js
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

const useWindowDraggable = (windowEl, triggerEl, bounds, onFocus) => {
  Draggable.create(windowEl, {
    trigger: triggerEl,
    type: 'x,y',
    bounds,
    inertia: true,
    onPress: onFocus,
    onDragStart: onFocus,
  });
};

export default useWindowDraggable;
