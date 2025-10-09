/**
 * Verifica se um determinado caractere foi excedido em uma string
 * 
 * @param str  
 * @param char 
 * @param limit 
 * @returns boolean
 */

const exceedsCharLimit = (str: string, char: string, limit: number) => {
  const regex = new RegExp(`\\${char}`, 'g');
  const count = (str.match(regex) || []).length;
  return count > limit;
};

export default exceedsCharLimit;
