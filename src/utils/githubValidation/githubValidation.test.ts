import { gitHubValidation } from './githubValidation';

describe('utils :: gitHubValidation', () => {
    it('should return true for valid usernames', () => {
        const validUsernames = [
            'validusername',
            'valid-username',
            'valid123',
            'valid-username-123',
            'a',
            '0',
        ];

        validUsernames.forEach(username => {
            expect(gitHubValidation(username)).toBe(true);
        });
    });

    it('should return false for usernames with invalid characters', () => {
        const invalidUsernames = [
            'InvalidUsername',
            'invalid_username',
            'invalid.username',
            'invalid@username',
            'invalid!',
            'invalid#',
        ];

        invalidUsernames.forEach(username => {
            expect(gitHubValidation(username)).toBe(false);
        });
    });

    it('should return false for usernames starting or ending with a hyphen', () => {
        const invalidUsernames = [
            '-invalidusername',
            'invalidusername-',
            '-invalid-username-',
        ];

        invalidUsernames.forEach(username => {
            expect(gitHubValidation(username)).toBe(false);
        });
    });

    it('should return false for empty username', () => {
        expect(gitHubValidation('')).toBe(false);
    });

    it('should return false for usernames with spaces', () => {
        const invalidUsernames = [
            'invalid username',
            ' invalidusername',
            'invalidusername ',
        ];

        invalidUsernames.forEach(username => {
            expect(gitHubValidation(username)).toBe(false);
        });
    });
});
