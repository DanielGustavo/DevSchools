import { toast } from 'react-toastify';

import notifier from '../helpers/notifier';

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
}

export function handleApiError(error: unknown) {
  const errorMessage =
    (error as ErrorResponse)?.response?.data?.error ?? 'Something went wrong';

  toast(errorMessage, {
    type: 'error',
  });

  const isUnauthenticated = (error as ErrorResponse).response.status === 401;

  if (isUnauthenticated) {
    notifier.notify('logout');
  }

  return undefined;
}
