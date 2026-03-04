import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

type CreateWindowDraggableOptions = {
  windowRef: React.RefObject<HTMLElement>;
  triggerElement?: React.RefObject<HTMLElement> | null;
  bounds: React.RefObject<HTMLElement>;
  updateWindowState?: (state: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    startX?: number;
    startY?: number;
    startWidth?: number;
    startHeight?: number;
  }) => void;
  width?: number;
  height?: number;
};

const createWindowDraggable = ({
  windowRef,
  triggerElement,
  bounds,
  updateWindowState,
  width,
  height,
}: CreateWindowDraggableOptions) => {
  if (!windowRef.current || !bounds?.current) return;

  return Draggable.create(windowRef.current, {
    trigger: triggerElement?.current ?? windowRef.current,
    type: 'x,y',
    zIndexBoost: false,
    bounds: bounds.current,
    inertia: true,
    allowEventDefault: true,
    edgeResistance: 0,
    onDragStart: function () {
      if (updateWindowState) {
        const { x, y } = this;
        updateWindowState({
          startX: x,
          startY: y,
          startWidth: width,
          startHeight: height,
        });
      }
    },
    onDragEnd: function () {
      if (updateWindowState) {
        const { x, y } = this;
        const rect = this.target.getBoundingClientRect();
        updateWindowState({
          x,
          y,
          width: rect.width,
          height: rect.height,
        });
      }
    },
  });
};

export default createWindowDraggable;
