import { toast } from 'react-toastify';

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

export function handleApiError(error: unknown) {
  const errorMessage =
    (error as ErrorResponse)?.response?.data?.error ?? 'Something went wrong';

  toast(errorMessage, {
    type: 'error',
  });

  return undefined;
}
