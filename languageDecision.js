import { portuguese } from './languages/portuguese.js';
import { english } from './languages/english.js';

const userLanguage = navigator.language || navigator.userLanguage;
document.querySelector('html').innerHTML = userLanguage.includes("pt") ? portuguese() : english();









