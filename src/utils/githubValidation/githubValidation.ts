export const gitHubValidation = (username: string): boolean => {
    const regex = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return regex.test(username);
};