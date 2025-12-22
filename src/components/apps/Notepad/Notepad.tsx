import { use, useCallback, useRef, useState } from 'react';
import { Dropdown } from '@/components/ui';
import { dropdownItem } from '@/components/ui/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import './Notepad.styles.css';

const Notepad = () => {
  const content = useSelector(
    (state: RootState) => state.file.filesList.content
  );
  const dropdownList: dropdownItem[] = [
    { label: 'New Tab' },
    { label: 'New Window' },
    { label: 'Open' },
    { label: 'Save' },
    { label: 'Save All' },
    { isDivisor: true },
    { label: 'Page Options' },
    { label: 'Print' },
    { isDivisor: true },
    { label: 'Close Tab' },
    { label: 'Close Window' },
    { label: 'Close All' },
  ];
  const [text, setText] = useState(content);
  const textareaRef = useRef(null);
  // const handleTextChange = useCallback(
  //   (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setText(e.target.value);
  //   },
  //   []
  // );
  return (
    <div className="notepad">
      <nav className="notepad__nav">
        <ul>
          <li>
            <Dropdown dropdownList={dropdownList} dropdownTitle="File" />
          </li>
        </ul>
      </nav>
      <textarea
        ref={textareaRef}
        name="notepad"
        title={text}
        placeholder=""
        className="notepad__text"
        value={text}
      />
    </div>
  );
};

export default Notepad;
