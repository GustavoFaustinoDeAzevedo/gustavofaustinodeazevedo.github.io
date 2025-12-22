import React from 'react';
import { saveUser, loadUser } from '@store/actions';
import { db } from '@store/utils/db';

const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(
  window.location.hostname
);

function DevMenu() {
  if (!isLocalhost) return null; // só aparece em localhost

  const populateDatabase = async () => {
    await saveUser({ name: 'Maria' });
    await saveUser({ name: 'João' });
    await saveUser({ name: 'Ana' });
    await loadUser();
  };

  const clearDatabase = async () => {
    await db.users.clear();
    await loadUser();
  };

  return (
    <div
      style={{
        background: '#222',
        color: '#fff',
        padding: '10px',
        marginTop: '20px',
      }}
    >
      <h3>Menu Dev</h3>
      <button onClick={populateDatabase}>Popular Banco</button>
      <button onClick={clearDatabase}>Limpar Banco</button>
      <button onClick={() => loadUser()}>Recarregar Redux</button>
    </div>
  );
}

export default DevMenu;
