import { getUserDetails, getUserRepos, getRepoDetails } from './api';

jest.mock('./api', () => ({
  getUserDetails: jest.fn(),
  getUserRepos: jest.fn(),
  getRepoDetails: jest.fn(),
}));

describe('API :: api functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user details successfully', async () => {

    const mockResponse = { username: 'wendellchrys', name: 'Wendell Christian' };
    (getUserDetails as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getUserDetails('wendellchrys');
    expect(result.username).toBe('wendellchrys');
    expect(result.name).toBe('Wendell Christian');
  });

  it('should throw an error when fetching user details fails', async () => {
    (getUserDetails as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    await expect(getUserDetails('wendellchrys')).rejects.toThrow('API error');
  });

  it('should fetch user repositories successfully', async () => {
    const mockReposResponse = [
      { name: 'repo1', stars: 10 },
      { name: 'repo2', stars: 20 },
    ];
    (getUserRepos as jest.Mock).mockResolvedValueOnce(mockReposResponse); 

    const result = await getUserRepos('wendellchrys');
    expect(result).toEqual(mockReposResponse);
  });

  it('should throw an error when fetching user repositories fails', async () => {
    (getUserRepos as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    await expect(getUserRepos('wendellchrys')).rejects.toThrow('API error');
  });

  it('should fetch repository details successfully', async () => {
    const mockRepoDetails = { name: 'repo1', description: 'Descrição de teste' };
    (getRepoDetails as jest.Mock).mockResolvedValueOnce(mockRepoDetails);

    const result = await getRepoDetails('wendellchrys', 'repo1');
    expect(result.name).toBe('repo1');
    expect(result.description).toBe('Descrição de teste');
  });

  it('should throw an error when fetching repository details fails', async () => {
    (getRepoDetails as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    await expect(getRepoDetails('wendellchrys', 'repo1')).rejects.toThrow('API error');
  });
});
