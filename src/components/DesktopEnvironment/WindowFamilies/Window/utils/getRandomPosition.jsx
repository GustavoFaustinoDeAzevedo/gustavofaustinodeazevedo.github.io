const getRandomPosition = () => {
  const desktop = document.querySelector('body');
  if (!desktop) return { x: 0, y: 0 };
  const randomX = Math.floor(Math.random() * (desktop.offsetWidth / 2));
  const randomY = Math.floor(Math.random() * (desktop.offsetHeight / 4));
  return { randomX, randomY };
};

export default getRandomPosition;
