export const passwordValidator = (password: string): string | undefined => {
  if (password === '') return 'A senha é requerida';
  if (password.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
  if (password.length > 20) return 'A senha deve ter no máximo 20 caracteres';
  return undefined;
};
