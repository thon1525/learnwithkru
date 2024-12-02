import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserById } from '../htttp-request';
import { logger } from '../../utils/logger';
import { ApiError } from '../../error/base-custom-error';
import getConfig from '../config';
import { PATH_USER } from '../../routes/path-defs';

jest.mock('../config');
jest.mock('../../utils/logger');

const mockConfig = {
  userService: 'http://localhost:3004'
};

(getConfig as jest.Mock).mockReturnValue(mockConfig);

describe('getUserById', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch user data successfully', async () => {
    const userId = '123';
    const mockUser = { id: userId, name: 'John Doe' };
    
    mockAxios.onGet(`${mockConfig.userService}${PATH_USER.GET}/${userId}`).reply(200, mockUser);

    const result = await getUserById(userId);

    expect(result).toEqual(mockUser);
  });

  it('should throw an error when the status is not 200', async () => {
    const userId = '123';
    
    mockAxios.onGet(`${mockConfig.userService}${PATH_USER.GET}/${userId}`).reply(500);

    await expect(getUserById(userId)).rejects.toThrow(new ApiError("Error communicating with user service."));
  });

  it('should log and throw an ApiError on Axios error', async () => {
    const userId = '123';
    const errorMessage = 'Network Error';

    mockAxios.onGet(`${mockConfig.userService}${PATH_USER.GET}/${userId}`).networkError();

    await expect(getUserById(userId)).rejects.toThrow(new ApiError("Error communicating with user service."));

    expect(logger.error).toHaveBeenCalledWith('Axios Error in createUser() method:', errorMessage);
  });

  it('should log and throw an unknown error', async () => {
    const userId = '123';
    const unknownError = new Error('Unknown Error');

    jest.spyOn(axios, 'get').mockImplementation(() => {
      throw unknownError;
    });

    await expect(getUserById(userId)).rejects.toThrow('Unknown Error');

    expect(logger.error).toHaveBeenCalledWith('Unknown Error in createUser() method:', unknownError);
  });
});
