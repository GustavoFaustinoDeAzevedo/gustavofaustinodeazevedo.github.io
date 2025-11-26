import { useCallback } from 'react';

type WindowAction =
  | 'isRequestingMinimize'
  | 'isRequestingMaximize'
  | 'isRequestingRestore'
  | 'isRequestingClose'
  | 'isRequestingFocus';

const actions: WindowAction[] = [
  'isRequestingMinimize',
  'isRequestingMaximize',
  'isRequestingRestore',
  'isRequestingClose',
  'isRequestingFocus',
];

const createWindowHandlers = (
  updateWindowState: (params: Record<string, any>) => void
): Record<string, (v: boolean) => void> => {
  const windowHandlers = Object.fromEntries(
    //itera sobre actions e cria uma array com os nomes dos handlers.
    //Os nomes dos handlers são os mesmos que as actions, mas com "handle" no lugar de "requesting".
    actions.map((action) => [
      //Obtem o nome do handler substituindo "requesting" por "handle".
      action.replace(/^isRequesting/, 'handleRequest'),
      //Cria uma nova função UseCallback para cada manipulador.
      //A função leva um valor booleano e chama UpdateWindowState com a ação e o valor.
      useCallback(
        () => updateWindowState({ [action]: true }),
        [updateWindowState]
      ),
    ])
  );

  //retorna o objeto com os manipuladores de janela.
  return windowHandlers;
};

export default createWindowHandlers;
