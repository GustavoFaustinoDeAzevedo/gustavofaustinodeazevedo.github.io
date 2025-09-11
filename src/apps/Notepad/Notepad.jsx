import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdow';

const Notepad = ({ windowId }) => {
  const dropdownList = [
    { label: 'New Tab' },
    { label: 'New Window' },
    { label: 'Open' },
    { label: 'Recent' },
    { label: 'Save' },
    { label: 'Save as' },
    { label: 'Save All' },
    { isDivisor: true },
    { label: 'Page Options' },
    { label: 'Print' },
    { isDivisor: true },
    { label: 'Close Tab' },
    { label: 'Close Window' },
    { label: 'Close All' },
  ];
  const [text, setText] = useState('');
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="notepad">
      <nav className="notepad__nav">
        <ul>
          <li>
            <Dropdown
              dropdownList={dropdownList}
              dropdownTitle="File"
              windowKey={windowId}
            />
          </li>
        </ul>
      </nav>
      <textarea
        className="notepad__text"
        onChange={handleTextChange}
        value={text}
      />
    </div>
  );
};

export default Notepad;
