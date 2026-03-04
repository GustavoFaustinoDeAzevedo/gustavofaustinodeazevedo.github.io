import { useEffect, useRef, useState } from 'react';
import createWindowDraggable from '../../WindowFamilies/Window/utils/createWindowDraggable';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ErrorFallback = ({ error, handleClose }: any) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const popUpRef = useRef<HTMLDivElement | null>(null);
  const [displayError, setDisplayError] = useState(true);

  const handleClick = () => {
    handleClose();
    setDisplayError((prev) => !prev);
  };

  const contentTranslations = {
    por: {
      title: '⚠ Erro na janela',
      message: 'Ocorreu um problema inesperado na janela".',
      details: 'Detalhes do erro:',
      button: 'Fechar',
    },
    eng: {
      title: '⚠ Window error',
      message: 'An unexpected error occurred in the window".',
      details: 'Error details:',
      button: 'Close',
    },
  };

  const translatedContent =
    contentTranslations[language as keyof typeof contentTranslations];

  return (
    displayError && (
      <div className="error-overlay">
        <div ref={popUpRef} className="error-popup" role="alert">
          <h2 className="error-title">{translatedContent.title}</h2>
          <p className="error-message">
            {translatedContent.message}
            <br />
            {translatedContent.details}
          </p>
          <pre className="error-details">{error.message}</pre>
          <div className="error-actions">
            <button onClick={handleClick} className="error-button">
              {translatedContent.button}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorFallback;
