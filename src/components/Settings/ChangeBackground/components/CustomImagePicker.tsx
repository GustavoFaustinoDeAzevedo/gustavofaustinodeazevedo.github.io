import { use, useEffect, useRef, useState } from 'react';
import DesktopBackground from '../../../Desktop/components';
import Button from '../../../ui/Button';
import styled from 'styled-components';

const CustomImagePicker = ({
  language,
  handleChangeBackground,
  handleUpdateWindowContent,
  displayChoicesContent,
  backgroundImage,
}) => {
  const translations = {
    eng: 'Custom Image Picker Component',
    por: 'Componente de Seletor de Imagem Personalizada',
  };
  const [preview, setPreview] = useState<string | null>(backgroundImage);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => {
    const file = fileRef.current?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  useEffect(() => {
    if (preview) {
      handleChangeBackground({
        backgroundImage: preview,
      });
    }
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <Button onClick={() => fileRef.current?.click()}>
        {displayChoicesContent?.settings?.picker?.button}
      </Button>
      <input
        title={translations[language]}
        ref={fileRef}
        onChange={handleSelectImage}
        type="file"
        accept="image/*"
        className="change-background__file-input"
      />
    </>
  );
};

export default CustomImagePicker;
