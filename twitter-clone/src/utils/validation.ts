export function lengthValidation(value: string, max: number, min: number = 0) {
  if (!min && value.length >= 0 && value.length <= max) return true;

  if (min && value.length >= min && value.length <= max) return true;

  return false;
}
