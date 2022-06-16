export const emailValidator = (email: string): string | undefined => {
  if (email === '') return 'O email é requerido';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return 'O email é inválido';
  return undefined;
};
