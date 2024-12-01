import { getErrorMessage } from './errorHandler';

describe('utils :: getErrorMessage', () => {
    it('should return the error message if error is an instance of Error', () => {
        const error = new Error('This is an error message');
        const result = getErrorMessage(error);
        expect(result).toBe('This is an error message');
    });

    it('should return a default message if error is not an instance of Error', () => {
        const error = 'Some error string';
        const result = getErrorMessage(error);
        expect(result).toBe('An unexpected error occurred');
    });

    it('should return a default message if error is null', () => {
        const error = null;
        const result = getErrorMessage(error);
        expect(result).toBe('An unexpected error occurred');
    });

    it('should return a default message if error is undefined', () => {
        const error = undefined;
        const result = getErrorMessage(error);
        expect(result).toBe('An unexpected error occurred');
    });

    it('should return a default message if error is an object that is not an instance of Error', () => {
        const error = { message: 'This is an error message' };
        const result = getErrorMessage(error);
        expect(result).toBe('An unexpected error occurred');
    });
});
