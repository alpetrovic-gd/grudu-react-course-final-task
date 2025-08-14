export function passwordValidation(password: string) {
  if (password.length >= 8 && password.length <= 256) return true;
  return false;
}
