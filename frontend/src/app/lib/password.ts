const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = /[oO0lI1]/g;

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const defaults: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

export function generatePassword(options: Partial<PasswordOptions> = {}): string {
  const opts = { ...defaults, ...options };
  let chars = '';

  if (opts.lowercase) chars += LOWERCASE;
  if (opts.uppercase) chars += UPPERCASE;
  if (opts.numbers) chars += DIGITS;
  if (opts.symbols) chars += SYMBOLS;

  if (!chars) chars = LOWERCASE;

  if (opts.excludeAmbiguous) chars = chars.replace(AMBIGUOUS, '');

  let password = '';
  for (let i = 0; i < opts.length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

export function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', score, color: 'bg-red-500' };
  if (score <= 3) return { label: 'Fair', score, color: 'bg-orange-500' };
  if (score <= 4) return { label: 'Good', score, color: 'bg-yellow-500' };
  return { label: 'Strong', score, color: 'bg-green-500' };
}
