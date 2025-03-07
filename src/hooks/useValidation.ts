export const useValidation = () => {
  const validateLogin = (login: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(login);
  };

  const validatePassword = (password: string) => {
    return password.length >= 5; 
  };

  return { validateLogin, validatePassword };
};