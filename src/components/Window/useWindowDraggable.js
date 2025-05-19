
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

const useWindowDraggable = (windowRef, triggerEl, bounds, onFocus, onUpdateWindow, width, height) => {



  Draggable.create(windowRef.current, {
    trigger: triggerEl,
    type: 'x,y',
    zIndexBoost: false,
    bounds,
    inertia: true,
    onPress: onFocus,
    onDragStart:

      onFocus
    ,
    onDragEnd: function () {
      console.log(this)
      const { startX, startY, x, y } = this;
      const finalWidth = this.target.getBoundingClientRect().width;
      const finalHeight = this.target.getBoundingClientRect().height;
      onUpdateWindow({ startX, startY, x, y, width: finalWidth, height: finalHeight, startWidth: width, startHeight: height });
    }
  });
};

export default useWindowDraggable;
