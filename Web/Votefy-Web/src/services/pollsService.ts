// src/services/pollsService.ts
import { api } from './api';

export type VoterDto = {
  userID: string;
  pollID: string;
  value: string;
  createdAt: string;
};

export const getPolls = async () => {
  const response = await api.get('/votes/definitions');
  return response.data;
};

export const deletePoll = async (pollId: string) => {
  await api.delete(`/votes/definitions/${pollId}`);
};

export const activatePoll = async (pollId: string) => {
  await api.post(`/votes/definitions/${pollId}/activate`);
};

export const inactivatePoll = async (pollId: string) => {
  await api.post(`/votes/definitions/${pollId}/inactivate`);
};

export const isPollActive = async (pollId: string) => {
  const response = await api.get<boolean>(`/votes/definitions/${pollId}/active`);
  return response.data as boolean;
};

export const getPollVotesDistribution = async (pollId: string) => {
  const response = await api.get(`/votes/question/${pollId}/calculate`);
  return response.data as Record<string, number>;
};

export const getPollVoters = async (pollId: string): Promise<VoterDto[]> => {
  const response = await api.get<VoterDto[]>(`/votes/${pollId}/voters`);
  return response.data;
};
export const login = async (adminID: string, password: string):Promise<boolean> => {
  const response = await api.post<boolean>('/votes/login', {
    adminID: adminID,
    password: password,
  });
  return response.data;
}
export const createAdmin = async (adminID: string, password: string) => {
  const response = await api.post<boolean>('/votes/create-admin', {
    adminID: adminID,
    password: password,
  });
  return response.data;
}
export const createPoll = async (title: string, type: string, options: string[]) => {
  return api.post<boolean>('/votes/definitions', {
    title,
    type,
    options,
  });
};
