export const useMountCheck = () => {
  const didMountRef = useRef(false);

  if (!didMountRef.current) {
    didMountRef.current = true;
    return true;
  }

}

export default useMountCheck