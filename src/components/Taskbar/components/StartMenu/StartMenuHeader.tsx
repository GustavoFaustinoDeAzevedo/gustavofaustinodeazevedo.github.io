import Icon from '@/components/ui/GlobalStyles/components/Icon';
import { Language } from '@/store/slices/settings';

const StartMenuHeader = ({
  searchAppValue,
  handleCleanInput,
  handleSearchAppChange,
  handleSearchAppBlur,
  language,
}: {
  searchAppValue: string;
  handleCleanInput: () => void;
  handleSearchAppChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchAppBlur: () => void;
  language: Language;
}) => {
  return (
    <header className="start-menu__header">
      <Icon className="start-menu__search-file-icon left" variant="search" />
      {searchAppValue && (
        <p
          className="start-menu__search-file-icon right"
          onClick={handleCleanInput}
        >
          &#x2716;
        </p>
      )}
      <input
        className="start-menu__search-file-input"
        tabIndex={-1}
        type="text"
        aria-label={
          language !== 'por'
            ? 'Search for apps and documents'
            : 'Pesquisar por aplicativos e documentos'
        }
        placeholder={
          language !== 'por'
            ? 'Search for apps and documents'
            : 'Pesquisar por aplicativos e documentos'
        }
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        role="search"
        value={searchAppValue}
        onChange={handleSearchAppChange}
        onBlur={handleSearchAppBlur}
      />
    </header>
  );
};

export default StartMenuHeader;
