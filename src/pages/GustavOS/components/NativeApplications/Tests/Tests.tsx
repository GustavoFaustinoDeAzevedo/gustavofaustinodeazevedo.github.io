import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const Tests = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  const navData = [
    { name: { por: 'Interface', eng: 'Interface' }, id: 'interface' },
    { name: { por: 'Entrada', eng: 'Input' }, id: 'input' },
    { name: { por: 'Saída', eng: 'Output' }, id: 'output' },
    { name: { por: 'Kernel', eng: 'Kernel' }, id: 'kernel' },
    { name: { por: 'Utilitários', eng: 'Utilities' }, id: 'utilities' },
  ];

  const listContent = navData.map((item) => (
    <li key={item.id}>
      <span>{item.name[language]}</span>
    </li>
  ));

  return (
    <div className="tests">
      <nav className="tests-nav">
        <ul className="tests-nav__list">{listContent}</ul>
      </nav>
    </div>
  );
};

export default Tests;
