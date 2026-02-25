import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { useDelayBlock } from '@/shared/hooks/useDelayBlock';
import { useState } from 'react';

gsap.registerPlugin(Draggable);

type CreateWindowDraggableOptions = {
  windowRef: React.RefObject<HTMLElement>;
  triggerElement: HTMLElement;
  desktopRef: React.RefObject<HTMLElement>;
  updateWindowState: <T>(state: T) => void;
  width: number;
  height: number;
};

const createWindowDraggable = ({
  windowRef,
  triggerElement,
  desktopRef,
  updateWindowState,
  width,
  height,
}: CreateWindowDraggableOptions) => {
  if (!windowRef?.current || !desktopRef?.current) return;

  Draggable.create(windowRef.current, {
    trigger: triggerElement,
    type: 'x,y',
    zIndexBoost: false,
    bounds: desktopRef.current,
    inertia: true,
    allowEventDefault: true,
    onDragStart: function () {
      const { x, y } = this;
      updateWindowState({
        startX: x,
        startY: y,
        startWidth: width,
        startHeight: height,
      });
    },
    onDragEnd: function () {
      const { x, y } = this;
      const finalWidth = this.target.getBoundingClientRect().width;
      const finalHeight = this.target.getBoundingClientRect().height;
      updateWindowState({ x, y, width: finalWidth, height: finalHeight });
    },
  });
};

export default createWindowDraggable;
