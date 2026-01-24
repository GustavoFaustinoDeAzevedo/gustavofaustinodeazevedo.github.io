import { use, useCallback, useMemo, useRef, useState } from 'react';
import { Dropdown } from '@/components/ui';
import { DropdownItem } from '@/components/ui/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

// import './Notepad.styles.css';

const Notepad = ({ content = '' }) => {
  // const content = useSelector(
  //   (state: RootState) => state.file.filesList.content
  // );

  const language = useSelector((state: RootState) => state.settings.language);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { handleNewFile } = actions.useFilesActions();

  const dropdownList: { eng: DropdownItem[]; por: DropdownItem[] } =
    useMemo(() => {
      return {
        eng: [
          { label: 'New Tab' },
          { label: 'New Window' },
          { label: 'Open' },
          {
            label: 'Save',
            onClick: () => {
              console.log('Saving file...');
              handleNewFile(`users/${currentUser.name}/desktop`, {
                fileId: `file-${Date.now()}`,
                key: 'notepad',
                content: text,
                icon: 'notepad',
                type: 'text',
                createdAt: new Date(),
                updatedAt: new Date(),
                title: { eng: 'New File', por: 'Novo Arquivo' },
              });
            },
          },
          { label: 'Save All' },
          { isDivisor: true },
          { label: 'Page Options' },
          { label: 'Print' },
          { isDivisor: true },
          { label: 'Close Tab' },
          { label: 'Close Window' },
          { label: 'Close All' },
        ],
        por: [
          { label: 'Nova Aba' },
          { label: 'Nova Janela' },
          { label: 'Abrir' },
          {
            label: 'Salvar',
            onClick: () => {
              console.log('Saving file...');
              handleNewFile('users/guests/desktop', {
                fileId: `file-${Date.now()}`,
                key: 'notepad',
                content: text,
                icon: 'notepad',
                type: 'text',
                createdAt: new Date(),
                updatedAt: new Date(),
                title: { eng: 'New File', por: 'Novo Arquivo' },
              });
            },
          },
          { label: 'Salvar Tudo' },
          { isDivisor: true },
          { label: 'Opções da Página' },
          { label: 'Imprimir' },
          { isDivisor: true },
          { label: 'Fechar Aba' },
          { label: 'Fechar Janela' },
          { label: 'Fechar Tudo' },
        ],
      };
    }, []);
  const [text, setText] = useState(
    content[0] ? JSON.stringify(content, null, 2) : '',
  );
  const textareaRef = useRef(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [],
  );

  return useMemo(
    () => (
      <div className="notepad">
        <nav className="notepad__nav">
          <ul>
            <li>
              <Dropdown
                dropdownList={
                  dropdownList[language as keyof typeof dropdownList]
                }
                dropdownTitle="File"
              />
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
    [text],
  );
};

export default Notepad;
