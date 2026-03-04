const CorruptedFile = ({ message }: { message: string }) => {
  throw new Error(message);
};

export default CorruptedFile;
