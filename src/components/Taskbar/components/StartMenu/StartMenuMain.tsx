import { ListFiles } from '@components/FilesExplorer';
import { StylesConfig } from '@components/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import { FileNode } from '@/store/slices/file';
import { WindowData } from '@/store/actions/useWindowActions';
import { Language } from '@/store/slices/settings';
import { Title } from '@/store/slices/window';
import { useMemo } from 'react';

const StartMenuMain = ({
  language,
  installedApps,
  history,
  handleToggleVisibility,
  handleOpenHistoryApp,
  searchAppValue,
  fileWrapperStyle,
}: {
  language: Language;
  installedApps: FileNode[];
  history: Title[];
  handleToggleVisibility: () => void;
  handleOpenHistoryApp: (appProps: WindowData) => void;
  searchAppValue: string;
  fileWrapperStyle: StylesConfig;
}) => {
  const stylesConfig = useMemo(() => ({ ...fileWrapperStyle, gap: '2px' }), []);

  return (
    <main className="flex flex-column gap-2">
      <fieldset className="start-menu__fieldset">
        <legend className="text-xs text-bold">
          {language !== 'por' ? 'Apps' : 'Aplicativos'}
        </legend>
        <ListFiles
          handleGlobalClick={handleToggleVisibility}
          currentNode={''}
          className={'start-menu__list'}
          openMode={'window'}
          language={language}
          content={installedApps}
          doubleClickToOpen={false}
          stylesConfig={stylesConfig}
          filters={searchAppValue}
        />
      </fieldset>

      <fieldset className="start-menu__fieldset">
        <legend className="text-xs text-bold">
          {language !== 'por' ? 'History' : 'Histórico'}
        </legend>
        <ul className="start-menu__list">
          {history?.map((value: Title, index: number) => {
            const key = value[language as keyof typeof value] || String(index);
            return (
              <li
                className="start-menu__list-item"
                key={key as string}
                onClick={() =>
                  handleOpenHistoryApp(value.reopenProps as WindowData)
                }
              >
                <Icon
                  className="start-menu__list-item-icon"
                  variant={value.icon}
                />
                <p>{value[language as keyof typeof value] as string}</p>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </main>
  );
};

export default StartMenuMain;
