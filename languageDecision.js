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

async function loadSVG(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const svgText = await response.text();
    const changeLanguageContainer = document.createElement('div');
    changeLanguageContainer.classList.add('change-language-container');
    changeLanguageContainer.innerHTML = svgText;

    const firstElement = document.querySelector('.header');

    // Adiciona o novo elemento como filho do primeiro elemento
    if (firstElement) {
      firstElement.appendChild(changeLanguageContainer);
      changeLanguageContainer.addEventListener('click', function () {
        // document.querySelector('html').innerHTML = userLanguage.includes('pt')
        //   ? portuguese()
        //   : english();
        userLanguage.includes('pt')
          ? localStorage.setItem(STORAGE_KEY, 'en')
          : localStorage.setItem(STORAGE_KEY, 'pt');
        location.reload();
      });
    } else {
      console.error('Elemento não encontrado!');
    }

    // Adiciona o SVG ao body ou a qualquer outro elemento desejado
  } catch (error) {
    console.error('Erro ao carregar o SVG:', error);
  }
}
window.addEventListener('load', function () {});

userLanguage.includes('pt')
  ? loadSVG('/assets/Flag_of_the_United_States.svg')
  : loadSVG('/assets/Bandeira_do_Brasil.svg');
