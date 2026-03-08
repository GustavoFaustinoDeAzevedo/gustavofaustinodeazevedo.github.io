import { useEffect, useRef, useState } from 'react';

export const ConsoleCommand = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [directory, setDirectory] = useState('\\');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = inputRef.current?.innerText || '';
      setOutput((prev) => [...prev, `${directory}> ${text}\noutput\n`]);
      if (inputRef.current) {
        inputRef.current.innerText = '';
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const onClick = () => {
    const el = inputRef.current as HTMLInputElement;
    if (el) {
      el.focus();
    }
  };

  return (
    <div onClick={onClick} className="console-command">
      <div >
        {output.map((line, i) => (
          <pre className="console-command__output" key={i}>
            {line}
          </pre>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex justify-start width-full">
        <span className="console-command__directory">{`${directory}> `}</span>
        <div
          contentEditable
          suppressContentEditableWarning
          ref={inputRef}
          autoCorrect="false"
          autoCapitalize="false"
          autoFocus
          onKeyDown={handleInput}
          className="console-command__input"
        ></div>
      </div>
    </div>
  );
};

export default ConsoleCommand;
