/**
 * Normaliza uma string decompondo caracteres Unicode, removendo marcas diacríticas e convertendo para minúsculas.
 *
 * Casos de uso: criação de chaves que não diferenciam acentos, slugs ou para comparações que não diferenciam maiúsculas de minúsculas e acentos.
 *
 */
const stringNormalizer = (str: string) => {
  return str
    .normalize('NFD') // separa letras dos acentos
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .toLowerCase(); // deixa em minúsculo
};

export default stringNormalizer;
