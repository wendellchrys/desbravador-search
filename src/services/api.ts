import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

export const getUserDetails = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}/repos?sort=stars&order=desc`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user repositories');
  }
};

export const getRepoDetails = async (username: string, repoName: string) => {
  try {
    const response = await api.get(`/repos/${username}/${repoName}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch repository details');
  }
};

export default api;
