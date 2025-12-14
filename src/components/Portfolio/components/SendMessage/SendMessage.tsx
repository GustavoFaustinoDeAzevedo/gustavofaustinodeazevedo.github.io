import Button from '@components/ui/Button';
import AnimatedInput from '@window/components/AnimatedInput';
import { Language } from '@/store/slices/settings';
import formData from './SendMessage.data';
import { useSelector } from 'react-redux';

const SendMessage = ({ language }: { language: Language }) => {
  const formDataTranslated = formData[language];
  const fields = [
    {
      id: 'name',
      type: 'input',
      name: 'Name',
      config: formDataTranslated.name,
    },
    {
      id: 'email',
      type: 'email',
      name: 'Email',
      config: formDataTranslated.email,
    },
    {
      id: 'message',
      type: 'text',
      name: 'Message',
      config: formDataTranslated.message,
      textArea: true,
    },
  ];

  return (
    <div className="send-message">
      <form
        className="send-message__form"
        aria-label={formDataTranslated.form.ariaLabel}
        action="https://formspree.io/f/mnqelzyz"
        method="POST"
        target="placeholder"
      >
        <h2 className="text-weight-600 text-center margin-bottom-1 ">
          {formDataTranslated.title}
        </h2>
        {fields.map(({ id, type, name, config, textArea }) => (
          <AnimatedInput
            key={id}
            id={id}
            type={type}
            name={name}
            label={config.label}
            required
            ariaLabel={config.ariaLabel}
            inputPlaceholder={config.placeholder}
            textArea={textArea}
          />
        ))}
        <Button
          type="submit"
          ariaLabel={formDataTranslated.button.ariaLabel}
          variant={'primary'}
        >
          {formDataTranslated.button.label}
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
