import { use, useCallback, useMemo, useRef, useState } from 'react';
import { Dropdown } from '@/components/ui';
import { dropdownItem } from '@/components/ui/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { e } from 'mathjs';
// import './Notepad.styles.css';

const Notepad = ({ content = '' }) => {
  // const content = useSelector(
  //   (state: RootState) => state.file.filesList.content
  // );
  const dropdownList: dropdownItem[] = useMemo(
    () => [
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
    ],
    []
  );
  const [text, setText] = useState(
    content[0] ? JSON.stringify(content, null, 2) : ''
  );
  const textareaRef = useRef(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  return useMemo(
    () => (
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
          onChange={handleChange}
        />
      </div>
    ),
    [text]
  );
};

export default Notepad;
