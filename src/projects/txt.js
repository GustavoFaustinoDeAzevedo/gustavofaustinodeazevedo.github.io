import { createNewWindow } from "../components/newWindow";

export const textFile = () => {
  createNewWindow()
  const header = window.createElement('div');
  const text = window.createElement('TEXTAREA');
  header.className = 'textHeader';
  text.className = 'textFile';
  window.appendChild(header);
}

export const newTextFile = (window) => {


}
