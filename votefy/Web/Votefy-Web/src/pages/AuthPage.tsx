import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthPage() {
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/votes/login', {
      adminID,
      password,
    });

    console.log('Response:', response.data);

    if (response.data === true) {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('Invalid Admin ID or Password');
    }
  } catch (err) {
    console.error(err);
    setError('Invalid Admin ID or Password');
  }
};
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1>Admin Login</h1>
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
      <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default AuthPage;
