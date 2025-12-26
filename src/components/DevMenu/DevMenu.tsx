import actions from '@store/actions';
import { db } from '@store/utils/db';

const DevMenu = () => {
  const { handleUpdateUser: saveUser } = actions.useUserActions();

  const populateDatabase = async () => {
    await saveUser({ name: 'Maria' });
    await saveUser({ name: 'João' });
    await saveUser({ name: 'Ana' });
  };

  const clearDatabase = async () => {
    await db.users.clear();
  };

  async function loadUsers() {
    const usuarios = await db.users.toArray();
    console.log(usuarios);
  }

  return (
    <div
      style={{
        background: '#222',
        color: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3>Menu Dev</h3>
      <button type="button" onClick={populateDatabase}>
        Popular Banco
      </button>
      <button type="button" onClick={clearDatabase}>
        Limpar Banco
      </button>
      <button type="button" onClick={loadUsers}>
        Carregar Usuários
      </button>
    </div>
  );
};

export default DevMenu;
