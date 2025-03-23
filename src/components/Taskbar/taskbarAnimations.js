import gsap from "gsap";

export const minimize = (windowRef, handler, id) => {
  if (!windowRef.current) return;

  gsap.to(windowRef.current, {
    scale: 0.9, // Reduz levemente o tamanho
    opacity: 0, // Some suavemente
    duration: 0.2, // Duração da animação
    ease: 'power2.inOut',
    onComplete: () => handler(id), // Chama a função de fechar após a animação
  });
};

export const restore = (windowRef, handler, id) => {
  if (!windowRef.current) return;
  // Define o estado inicial (invisível e pequeno)
  gsap.set(windowRef.current, { scale: 0.9, opacity: 0 });

  // Faz a animação de abertura
  handler(id);
  gsap.to(windowRef.current, {
    scale: 1, // Tamanho normal
    opacity: 1, // Totalmente visível
    duration: 0.2, // Duração da animação
    ease: 'power2.out',
  });
};