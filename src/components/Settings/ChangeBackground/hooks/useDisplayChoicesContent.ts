import { useEffect, useState } from 'react';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import { RootType } from '../types/changeBackground.data.types';
import { UseDisplayChoicesContentProps } from '../types/changeBackground.types';

const useDisplayChoicesContent = ({
  backgroundDisplay,
  language,
}: UseDisplayChoicesContentProps) => {
  const [displayChoicesRoot, setDisplayChoicesRoot] = useState<RootType | null>(
    null
  );
  const [displayChoicesContent, setDisplayChoicesContent] = useState<
    unknown | null
  >(null);

  useEffect(() => {
    const root = changeBackgroundTextContent[language];
    const content = root.choices[backgroundDisplay];
    setDisplayChoicesRoot(root);
    setDisplayChoicesContent(content);
  }, [backgroundDisplay, language]);

  return {
    displayChoicesContent,
    displayChoicesRoot,
  };
};

export default useDisplayChoicesContent;
