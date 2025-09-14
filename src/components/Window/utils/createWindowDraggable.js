
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
    onDragEnd: function () {
      const { startX, startY, x, y } = this;
      const finalWidth = this.target.getBoundingClientRect().width;
      const finalHeight = this.target.getBoundingClientRect().height;
      updateWindowState({ isRequestingFocus: true, startX, startY, x, y, width: finalWidth, height: finalHeight, startWidth: width, startHeight: height });
    }
  });
};

export default createWindowDraggable;
