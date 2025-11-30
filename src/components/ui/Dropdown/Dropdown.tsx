import { useClickOutside } from '@/shared';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export type dropdownItem = {
  label?: string;
  isDivisor?: boolean;
};

type DropdownProps = {
  dropdownList?: dropdownItem[];
  dropdownTitle?: string;
  dropdownId?: string;
};

const DropdownMenu = styled.ul<{
  $isOpen: boolean;
  $top: number;
  $left: number;
}>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  background-color: var(--color-background-2);
  min-width: 160px;
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  z-index: 9999;
  padding: 0.5rem 0;

  & li {
    color: var(--color-text);
    padding: 0.2rem 1.5rem;
    text-decoration: none;
    display: block;
    cursor: var(--cursor-pointer);

    &:hover {
      background-color: #ffffff1a;
    }
  }

  & hr {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 0.5rem 0;
  }
`;

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
        <DropdownMenu
          $isOpen={isOpen}
          $top={coords.top}
          $left={coords.left}
          id={dropdownId}
          key={dropdownId}
          aria-label={dropdownTitle}
          className="dropdown__menu"
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
        </DropdownMenu>,
        document.body
      )}
    </div>
  );
};

export default Dropdown;
