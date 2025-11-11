/**
 * Verifica se excedeu o numero de characteres em uma string baseado em um char especifico
 */

const exceedsCharLimit = (str: string, char: string, limit: number) => {
  const regex = new RegExp(`\\${char}`, 'g');
  const count = (str.match(regex) || []).length;
  return count > limit;
};

export default exceedsCharLimit;
