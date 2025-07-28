
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

/**
 * Creates a draggable window element using the GSAP Draggable utility
 * @param {React.RefObject} windowRef - Reference to the window element
 * @param {HTMLElement} triggerElement - Element that triggers the drag interaction
 * @param {Object} bounds - Boundaries constraining the window's movement
 * @param {Function} onFocus - Callback function triggered when window gains focus
 * @param {Function} onUpdateWindow - Callback function to update window properties after drag
 * @param {number} width - Initial width of the window
 * @param {number} height - Initial height of the window
 * @returns {void}
 */
const createWindowDraggable = ({ windowRef, triggerElement, bounds, onFocus, onUpdateWindow, width, height, isFocused }) => {

  Draggable.create(windowRef.current, {
    trigger: triggerElement,
    type: 'x,y',
    zIndexBoost: false,
    bounds,
    inertia: true,
    onPress: !isFocused ? onFocus : null,
    onDragStart:
      !isFocused ? onFocus : null,
    onDragEnd: function () {
      const { startX, startY, x, y } = this;
      const finalWidth = this.target.getBoundingClientRect().width;
      const finalHeight = this.target.getBoundingClientRect().height;
      onUpdateWindow({ startX, startY, x, y, width: finalWidth, height: finalHeight, startWidth: width, startHeight: height });
    }
  });
};

export default createWindowDraggable;
