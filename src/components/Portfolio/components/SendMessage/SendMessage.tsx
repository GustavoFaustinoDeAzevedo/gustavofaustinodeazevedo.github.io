import Button from '@/components/ui/Button';
import AnimatedInput from '@/components/Window/components/AnimatedInput';
import { Language } from '@/store/slices/settings';
import formData from './SendMessage.data';

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
    <form
      className="contact-form"
      aria-label={formDataTranslated.form.ariaLabel}
      action="https://formspree.io/f/mnqelzyz"
      method="POST"
      target="placeholder"
    >
      <h2 className="txt-weight-600 txt-center margin-bottom-1">
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
  );
};

export default SendMessage;
