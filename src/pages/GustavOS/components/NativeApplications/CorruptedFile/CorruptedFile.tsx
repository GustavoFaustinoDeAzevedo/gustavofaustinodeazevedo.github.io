import { useState } from 'react';

const CorruptedFile = ({ message }: { message: string }) => {
  const style = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'red',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.2rem',
      cursor: 'pointer',
    },
  };

  const [broken, setBroken] = useState(false);

  if (broken) {
    throw new Error(message);
  }

  return (
    <div style={style.container}>
      <button style={style.button} onClick={() => setBroken(true)}>
        Test
      </button>
    </div>
  );
};

export default CorruptedFile;
