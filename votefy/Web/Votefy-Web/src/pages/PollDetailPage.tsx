import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getPollVotesDistribution,
  getPollVoters,
  isPollActive,
  activatePoll,
  inactivatePoll,
} from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

function PollDetailPage() {
  const { pollId } = useParams<{ pollId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [distribution, setDistribution] = useState<Record<string, number>>({});
  const [voters, setVoters] = useState<{ userID: string; value: string; createdAt: string }[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [chartType, setChartType] = useState<'BAR' | 'PIE'>('BAR');

  const pollType = (location.state as any)?.pollType || '';

  const fetchData = async () => {
    if (!pollId) return;

    const dist = await getPollVotesDistribution(pollId);
    const votersList = await getPollVoters(pollId);
    const isActive = await isPollActive(pollId);

    setDistribution(dist);
    setVoters(votersList);
    setActive(isActive);
  };

  useEffect(() => {
    fetchData();
  }, [pollId]);

  const chartData = Object.entries(distribution).map(([option, count]) => ({
    name: option,
    value: count,
  }));

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
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← Back
      </button>

      <h1>Poll Details</h1>
      <p>Poll ID: {pollId}</p>
      <p>Status: {active ? 'Active' : 'Inactive'}</p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => activatePoll(pollId!).then(fetchData)}>Activate</button>
        <button
          onClick={() => inactivatePoll(pollId!).then(fetchData)}
          style={{ marginLeft: '10px' }}
        >
          Inactivate
        </button>
      </div>

      <h2>Votes View</h2>

      {pollType === 'OPEN_POLL' ? (
        <table border={1} cellPadding={8} cellSpacing={0} style={{ marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Vote</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter.userID + voter.createdAt}>
                <td>{voter.userID}</td>
                <td>{voter.value}</td>
                <td>{new Date(voter.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div style={{ marginBottom: '10px' }}>
            <button onClick={() => setChartType('BAR')} style={{ marginRight: '10px' }}>
              Bar Chart
            </button>
            <button onClick={() => setChartType('PIE')}>Pie Chart</button>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '300px',
              marginBottom: '20px',
            }}
          >
            <ResponsiveContainer>
              {chartType === 'BAR' ? (
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default PollDetailPage;
