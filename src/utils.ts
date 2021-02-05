export const valueIsNotNulish = (value: unknown): boolean => {
  return value !== undefined && value !== null;
};

export default {
  valueIsNotNulish,
};
