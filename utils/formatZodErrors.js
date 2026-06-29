export const formatZodErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    if (err.path) {
      errors[err.path[0]] = err.message;
    }
  });
  return errors;
};
