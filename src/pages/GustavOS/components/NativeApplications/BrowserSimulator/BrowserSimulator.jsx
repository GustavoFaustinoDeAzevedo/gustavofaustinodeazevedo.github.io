import { useRef, useState } from 'react';

const BrowserSimulator = (props) => {
  const [inputUrl, setInputUrl] = useState(props.src ?? 'https://example.com');
  const [history, setHistory] = useState([props.src ?? 'https://example.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef(null);

  const formatUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  const handleNavigate = () => {
    setHistory((prev) => [
      ...prev.slice(0, historyIndex + 1),
      formatUrl(inputUrl),
    ]);
    setHistoryIndex((prev) => prev + 1);
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = history[historyIndex];
      setInputUrl(history[historyIndex]);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setInputUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setInputUrl(history[historyIndex + 1]);
    }
  };

  return (
    <div
      className="browser-container"
      aria-label="Browser"
      data-initial-dimension='{"width": "1000px", "height": "600px"}'
    >
      <header className="browser-header" aria-label="Browser Header">
        <div className="browser-controls" aria-label="Browser Controls">
          <button
            style={{
              opacity: historyIndex > 0 ? '1' : '0.5',
              cursor: historyIndex > 0 ? 'pointer' : 'default',
            }}
            className=" icon arrow-left control-button"
            onClick={goBack}
          ></button>
          <button
            style={{
              opacity: historyIndex < history.length - 1 ? '1' : '0.5',
              cursor: historyIndex < history.length - 1 ? 'pointer' : 'default',
            }}
            className=" icon arrow-right control-button"
            onClick={goForward}
          ></button>
          <button
            className=" icon refresh control-button"
            onClick={handleReload}
          ></button>
        </div>

        <input
          className="website-input"
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
          placeholder="Enter URL and press Enter"
          aria-label="Website URL input"
        />
      </header>

      <main
        className="browser-frame-container"
        aria-label="Browser Frame Container"
      >
        <iframe
          className="browser-frame"
          title="Browser"
          ref={iframeRef}
          src={history[historyIndex]}
          sandbox="allow-scripts allow-same-origin"
          aria-label="Embedded Browser Frame"
          referrerPolicy="no-referrer"
          loading="lazy"
        ></iframe>
      </main>
    </div>
  );
};

export default BrowserSimulator;
