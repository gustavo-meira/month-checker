export const usernameValidator = (username: string): string | undefined => {
  if (username === '') return 'O nome de usuário é requerido';
  if (username.length < 3) return 'O nome de usuário deve ter no mínimo 3 caracteres';
  if (username.length > 20) return 'O nome de usuário deve ter no máximo 20 caracteres';
  return undefined;
};
