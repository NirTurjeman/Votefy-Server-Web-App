import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../services/pollsService';
function CreateAdminPage() {
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
  try {
    await createAdmin(adminID, password);
    navigate('/');
  } catch (err) {
    console.error(err);
    setError('Failed to create admin');
  }
};

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '20px'
    }}>
      <h1>Create New Admin</h1>
      <input
        type="text"
        placeholder="Admin ID"
        value={adminID}
        onChange={(e) => setAdminID(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleCreate}>Create Admin</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateAdminPage;
