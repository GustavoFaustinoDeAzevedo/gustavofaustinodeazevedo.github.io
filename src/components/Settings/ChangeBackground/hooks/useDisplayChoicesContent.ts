import { useEffect, useState } from 'react';
import { changeBackgroundTextContent } from '../data/changeBackground.data';

type Language = keyof typeof changeBackgroundTextContent;
type RootType = (typeof changeBackgroundTextContent)[Language];
type DisplayType = keyof RootType['choices'];
type ChoicesType = RootType['choices'][DisplayType];

interface UseDisplayChoicesContentProps {
  backgroundDisplay: DisplayType;
  language: Language;
}

const useDisplayChoicesContent = ({
  backgroundDisplay,
  language,
}: UseDisplayChoicesContentProps) => {
  const [displayChoicesRoot, setDisplayChoicesRoot] = useState<RootType | null>(
    null
  );
  const [displayChoicesContent, setDisplayChoicesContent] =
    useState<ChoicesType | null>(null);

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
