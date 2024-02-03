export const getErrorMessage = (error: any, defaultMessage: string): string => {
  const errorMessage = error?.response?.data?.message;
  if (errorMessage) {
    if (Array.isArray(errorMessage)) return errorMessage.join(", ");
    else return errorMessage;
  }

  return defaultMessage;
};
