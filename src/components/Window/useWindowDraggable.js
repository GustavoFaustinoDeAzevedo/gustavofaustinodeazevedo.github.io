
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

const useWindowDraggable = (windowEl, triggerEl, bounds, onFocus, updateInitialState) => {
  Draggable.create(windowEl, {
    trigger: triggerEl,
    type: 'x,y',
    zIndexBoost: false,
    bounds,
    inertia: true,
    onPress: onFocus,
    onDragStart: onFocus,
    onDragEnd: updateInitialState,
  });
};

export default useWindowDraggable;
