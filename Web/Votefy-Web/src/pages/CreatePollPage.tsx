import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../services/pollsService';

function CreatePollPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('MULTIPLE_CHOICE');
  const [options, setOptions] = useState<string[]>(['']);
  const navigate = useNavigate();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleCreate = async () => {
    const optionsToSend = type === 'OPEN_POLL' ? [] : options.filter((opt) => opt.trim() !== '');

    try {
    await createPoll(title, type, optionsToSend);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create poll');
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
        textAlign: 'center',
      }}
    >
      <h1>Create New Poll</h1>

      <input
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '300px',
        }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '300px',
        }}
      >
        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
        <option value="OPEN_POLL">Open Text</option>
      </select>

      {type === 'MULTIPLE_CHOICE' && (
        <div style={{ marginBottom: '10px', width: '100%', maxWidth: '400px' }}>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{
                display: 'block',
                marginBottom: '5px',
                padding: '8px',
                width: '100%',
              }}
            />
          ))}
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      )}

      <button onClick={handleCreate} style={{ padding: '10px 20px' }}>
        Create Poll
      </button>
    </div>
  );
}

export default CreatePollPage;
