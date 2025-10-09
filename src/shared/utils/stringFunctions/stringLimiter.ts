/**
 * Retorna uma string com um limite de caracteres
 *
 * @param str
 * @param limit
 * @returns string
 */

const stringLimiter = (str: string, limit: number) => str.slice(0, limit);

export default stringLimiter;
