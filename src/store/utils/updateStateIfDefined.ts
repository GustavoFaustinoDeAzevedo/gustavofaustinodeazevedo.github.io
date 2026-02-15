/**
 * Atualiza um objeto de estado com atualizações parciais.
 * @param state - O objeto de estado a ser atualizado.
 * @param updates - Atualizações parciais a serem aplicadas ao objeto de estado.
 * @returns Objeto de estado atualizado.
 * @template T - O tipo do objeto de estado.
 */

const updateStateIfDefined = <T extends object>(
  target: T,
  updates: Partial<T>,
): T => {
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      (target as any)[key] = value;
    }
  });
  return target;
};

export default updateStateIfDefined;
