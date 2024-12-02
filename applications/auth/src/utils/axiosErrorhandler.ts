import axios, { AxiosError } from 'axios';

interface HandleAxiosErrorOptions {
  redirectUrls?: { [key: string]: string };
  logError?: (message: string) => void;
  handleErrorResponse?: (response: any) => void;
}

export const handleAxiosError = (
  error: unknown,
  options: HandleAxiosErrorOptions = {}
) => {
  const { redirectUrls, logError, handleErrorResponse } = options;

  const log = (message: string) => {
    if (logError) {
      logError(message);
    } else {
      console.error(message);
    }
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const responseData = axiosError.response.data as any;

      if (redirectUrls) {
        for (const [message, url] of Object.entries(redirectUrls)) {
          if (responseData.errors?.message?.includes(message)) {
            window.location.href = url;
            return;
          }
        }
      }

      if (handleErrorResponse) {
        handleErrorResponse(axiosError.response);
      } else {
        log(`Response data: ${JSON.stringify(axiosError.response.data)}`);
        log(`Status code: ${axiosError.response.status}`);
        log(`Status message: ${axiosError.response.statusText}`);
      }
    } else if (axiosError.request) {
      log(`No response received: ${axiosError.request}`);
    } else {
      log(`Error setting up request: ${axiosError.message}`);
    }
  } else {
    const genericError = error as Error;
    log(`Error: ${genericError.message}`);
  }
};
