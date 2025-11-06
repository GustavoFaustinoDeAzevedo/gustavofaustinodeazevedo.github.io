
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);


const createWindowDraggable = ({ windowRef, triggerElement, bounds, onFocus, updateWindowState, width, height, isFocused }) => {
  Draggable.create(windowRef.current, {
    trigger: triggerElement,
    type: 'x,y',
    zIndexBoost: false,
    bounds,
    inertia: true,
    onDragStart: function () {
      const { x, y } = this;
      updateWindowState({ isRequestingFocus: true, startX: x, startY: y, startWidth: width, startHeight: height });
    },
    onDragEnd: function () {
      const { x, y } = this;
      const finalWidth = this.target.getBoundingClientRect().width;
      const finalHeight = this.target.getBoundingClientRect().height;
      updateWindowState({ x, y, width: finalWidth, height: finalHeight });
    }
  });
};

export default createWindowDraggable;
