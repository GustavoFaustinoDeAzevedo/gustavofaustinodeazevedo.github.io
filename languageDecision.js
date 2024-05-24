import { portuguese } from './languages/portuguese.js';
import { english } from './languages/english.js';

const STORAGE_KEY = 'userLanguage';
const storedLanguage = localStorage.getItem(STORAGE_KEY);

const userLanguage =
  storedLanguage || navigator.language || navigator.userLanguage;
document.querySelector('html').innerHTML = userLanguage.includes('pt')
  ? portuguese()
  : english();

localStorage.setItem(STORAGE_KEY, userLanguage);

document.addEventListener('DOMContentLoaded', function () {
  let language = storedLanguage ? storedLanguage : userLanguage;
});

window.addEventListener('load', function () {
  const dropdown = document.getElementById('dropdown');
  const savedLanguage = localStorage.getItem(STORAGE_KEY) || 'en'; // Idioma padrão é 'en'
  dropdown.value = savedLanguage; // Define o valor do dropdown com o idioma salvo
  dropdown.addEventListener('change', () => {
    const selectedValue = dropdown.value;
    localStorage.setItem(STORAGE_KEY, selectedValue);
    location.reload();
  });
});
