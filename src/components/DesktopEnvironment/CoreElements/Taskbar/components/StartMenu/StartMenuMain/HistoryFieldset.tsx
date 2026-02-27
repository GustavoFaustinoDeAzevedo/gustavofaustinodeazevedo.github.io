import Icon from '@/components/DesktopEnvironment/UIControls/GlobalStyles/components/Icon';
import { RootState } from '@/store';
import actions from '@/store/actions';
import { WindowData } from '@/store/actions/useWindowActions';
import { WindowTitle } from '@/store/slices/window';
import { useSelector } from 'react-redux';

const HistoryFieldset = () => {
  const { history } = useSelector((state: RootState) => state.window);
  const { language } = useSelector((state: RootState) => state.settings);
  const { handleOpenWindow } = actions.useWindowActions();

  const appHistoryFieldset = (
    <fieldset className="start-menu__fieldset margin-bottom-4">
      <legend className="text-xs text-bold">
        {language !== 'por' ? 'History' : 'Histórico'}
      </legend>
      <ul className="start-menu__list ">
        {history?.map((value: WindowTitle, index: number) => {
          const key = value[language as keyof typeof value] || String(index);
          return (
            <li
              className="start-menu__list-item"
              key={key as string}
              onClick={() => handleOpenWindow(value.reopenProps as WindowData)}
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
  );

  return appHistoryFieldset;
};

export default HistoryFieldset;
