import { useClickOutside } from '@/shared';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import StyledDropdownMenu from './StyledDropdownMenu';

export type dropdownItem = {
  label?: string;
  isDivisor?: boolean;
};

type DropdownProps = {
  dropdownList?: dropdownItem[];
  dropdownTitle?: string;
  dropdownId?: string;
};

const Dropdown = ({
  dropdownList = [],
  dropdownTitle = 'placeholder',
  dropdownId = crypto.randomUUID(),
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  const handleClick = (isDivisor?: boolean) => {
    if (isDivisor === true) return;
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom,
        left: rect.left,
      });
    }
  }, [isOpen, buttonRef]);

  useClickOutside({
    mainRef: dropdownRef,
    onClickOutside: () => handleClick(),
    isActive: isOpen,
    extraRef: buttonRef as React.RefObject<HTMLElement>,
  });

  return (
    <div className={'dropdown__container'}>
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={() => handleClick()}
        className="dropdown__toggler"
      >
        {dropdownTitle}
      </button>
      {createPortal(
        <StyledDropdownMenu
          $isOpen={isOpen}
          $top={coords.top}
          $left={coords.left}
          id={dropdownId}
          key={dropdownId}
          aria-label={dropdownTitle}
          data-dropdown-menu
          ref={dropdownRef as React.RefObject<HTMLUListElement>}
        >
          {dropdownList.map((item: dropdownItem, index: number) => (
            <li
              onClick={() => handleClick(item.isDivisor ?? false)}
              key={`${dropdownId}-${index}`}
            >
              {item.isDivisor ? (
                <hr className="dropdown__menu-divisor" />
              ) : (
                <p className="">{item.label}</p>
              )}
            </li>
          ))}
        </StyledDropdownMenu>,
        document.body
      )}
    </div>
  );
};

export default React.memo(Dropdown);
