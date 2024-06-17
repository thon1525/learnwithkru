// Mock the decodedToken and logger functions correctly
jest.mock('../../utils/jwt', () => ({
    decodedToken: jest.fn()
}));
// Import your modules
import { authorize } from '../authorize';
import { decodedToken } from '../../utils/jwt';

describe('authorize middleware', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer valid_token',
            },
        };
        res = {};
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next with no arguments if the user has sufficient permissions', async () => {
        const userRole = 'admin';
        const requiredRoles = ['admin', 'superadmin'];

        // Correctly cast decodedToken and mock its resolved value
        (decodedToken as jest.Mock).mockResolvedValue({ role: userRole });

        // Get the middleware function using the required roles
        const middleware = authorize(requiredRoles);

        // Execute the middleware with the mock request, response, and next function
        await middleware(req, res, next);

        // Assertions to check if everything was called as expected
        expect(req.user).toEqual({ role: userRole });
        expect(next).toHaveBeenCalledWith();
    });
});