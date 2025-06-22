import { useState } from 'react';

const Notepad = () => {
  const [text, setText] = useState('');
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="notepad">
      <nav className="notepad__nav">
        <ul>
          <li>
            <label for="file">File</label>
            <ul name="file">
              <li>New Tab</li>
              <li>New Window</li>
              <li>Open</li>
              <li>Recent</li>
              <li>Save</li>
              <li>Save as</li>
              <li>Save All</li>
              <li><hr /></li>
              <li>Page Options</li>
              <li>Print</li>
              <li><hr /></li>
              <li>Close Tab</li>
              <li>Close Window</li>
              <li>Close All</li>
            </ul>
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
