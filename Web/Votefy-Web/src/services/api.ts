import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/votes';
export type VoterDto = {
  userID: string;
  pollID: string;
  value: string;
  createdAt: string;
};

export const getPolls = async () => {
  const response = await axios.get(`${API_BASE_URL}/definitions`);
  console.log('Polls:', response.data);
  return response.data;
};

export const deletePoll = async (pollId: string) => {
  await axios.delete(`${API_BASE_URL}/definitions/${pollId}`);
};

export const activatePoll = async (pollId: string) => {
  await axios.post(`${API_BASE_URL}/definitions/${pollId}/activate`);
};

export const inactivatePoll = async (pollId: string) => {
  await axios.post(`${API_BASE_URL}/definitions/${pollId}/inactivate`);
};

export const isPollActive = async (pollId: string) => {
  const response = await axios.get(`${API_BASE_URL}/definitions/${pollId}/active`);
  return response.data as boolean;
};

export const getPollVotesDistribution = async (pollId: string) => {
  const response = await axios.get(`${API_BASE_URL}/question/${pollId}/calculate`);
  return response.data as Record<string, number>;
};

export const getPollVoters = async (pollId: string): Promise<VoterDto[]> => {
  const response = await axios.get(`${API_BASE_URL}/${pollId}/voters`);
  return response.data as VoterDto[];
};

