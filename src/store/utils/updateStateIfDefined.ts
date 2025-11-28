/**
 * Atualiza um objeto de estado com atualizações parciais.
 * @param state - O objeto de estado a ser atualizado.
 * @param updates - Atualizações parciais a serem aplicadas ao objeto de estado.
 * @returns Objeto de estado atualizado.
 * @template T - O tipo do objeto de estado.
 */

const updateStateIfDefined = <T extends Record<string, unknown>>(
  state: T,
  updates: Partial<T>
): T => {

  const definedUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value !== undefined)
  ) as T;


  return {
    ...state,
    ...definedUpdates,
  };
};

export default updateStateIfDefined;
