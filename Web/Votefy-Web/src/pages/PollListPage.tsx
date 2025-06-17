import { useEffect, useState } from 'react';
import { getPolls, deletePoll } from '../services/pollsService.ts';
import { useNavigate } from 'react-router-dom';

type Poll = {
  id: string;
  title: string;
  isActive: boolean;
  type: string;
  options: string[];
  createdAt: string;
};
function PollListPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const navigate = useNavigate();

const fetchPolls = async () => {
  const data = await getPolls();
  console.log('polls:', data, 'typeof:', typeof data, 'Array.isArray:', Array.isArray(data));
  setPolls(data);
};

  const handleDelete = async (pollId: string) => {
    await deletePoll(pollId);
    await fetchPolls();
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
  <div style={{ padding: '20px' }}>
    <h1>All Polls</h1>

    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => navigate('/create-admin')} style={{ marginRight: '10px' }}>
        Create Admin
      </button>
      <button onClick={() => navigate('/create-poll')}>
        Create Poll
      </button>
    </div>

    <table border={1} cellPadding={8} cellSpacing={0}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {polls.map((poll) => (
          <tr key={poll.id}>
            <td>{poll.title}</td>
            <td>{poll.type}</td>
            <td>{poll.isActive ? 'Yes' : 'No'}</td>
            <td>
              <button onClick={() => navigate(`/poll/${poll.id}`, { state: { pollType: poll.type } })}>View</button>
              <button onClick={() => handleDelete(poll.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default PollListPage;
