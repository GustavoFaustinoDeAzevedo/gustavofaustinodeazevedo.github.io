import { useClickOutside } from '@/shared';
import { useLayoutEffect, useRef, useState } from 'react';
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

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
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
  });
  return (
    <div ref={dropdownRef} className={'dropdown__container'}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
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
          className={`dropdown__menu ${isOpen ? 'visible' : 'hidden'}`}
        >
          {dropdownList.map((item: dropdownItem, index: number) => (
            <li key={`${dropdownId}-${index}`}>
              {item.isDivisor ? (
                <hr />
              ) : (
                <p className="" onClick={handleClick}>
                  {item.label}
                </p>
              )}
            </li>
          ))}
        </StyledDropdownMenu>,
        document.body
      )}
    </div>
  );
};

export default Dropdown;
