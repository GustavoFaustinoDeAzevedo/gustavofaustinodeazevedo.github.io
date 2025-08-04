interface Dimensions {
  width: number;
  height: number;
}

const parseDimensions = (json?: string): Dimensions => {
  try {
    console.log(json);
    const parsed = JSON.parse(json ?? '');
    if (typeof parsed.width === 'number' && typeof parsed.height === 'number') {
      return parsed as Dimensions;
    }
  } catch {}
  // fallback padrão
  return { width: 350, height: 450 };
};

export default parseDimensions;
