
const getRandomPosition = () => {
  const desktop = document.querySelector('body');
  if (!desktop) return { x: 0, y: 0 };
  const x = Math.floor(Math.random() * (desktop.offsetWidth / 2));
  const y = Math.floor(Math.random() * (desktop.offsetHeight / 4));
  return { x, y };
};

export default getRandomPosition;
