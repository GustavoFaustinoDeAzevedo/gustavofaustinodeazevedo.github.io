const updateStateIfDefined = <T extends Record<string, unknown>>(
  state: T,
  updates: Partial<T>
): T => {
  console.log(state);
  return {
    ...state,
    ...(Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    ) as T),
  };
};

export default updateStateIfDefined;
