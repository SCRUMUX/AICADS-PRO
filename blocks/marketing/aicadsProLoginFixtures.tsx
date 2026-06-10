import type { LoginBlockProps } from './LoginBlock';

export const aicadsProLoginContent: LoginBlockProps = {
  logo: 'AICADS PRO',
  title: 'Sign in to console',
  submitLabel: 'Sign in',
  forgotPasswordLabel: 'Forgot password?',
  forgotPasswordHref: '#forgot-password',
  rememberMeLabel: 'Remember me',
  labels: {
    username: 'Email',
    password: 'Password',
  },
  registrationHint: (
    <>
      Need access?{' '}
      <a href="#register" className="text-[var(--color-brand-primary)] underline underline-offset-2">
        Request an account
      </a>{' '}
      or contact{' '}
      <a href="mailto:hello@aicads.example" className="text-[var(--color-brand-primary)] underline underline-offset-2">
        hello@aicads.example
      </a>
    </>
  ),
  legalLinks: [
    { label: 'Privacy policy', href: '#' },
    { label: 'Status', href: '#' },
  ],
};

export const aicadsProLoginWithErrorContent: LoginBlockProps = {
  ...aicadsProLoginContent,
  errorMessage: 'Invalid email or password',
};

export const aicadsProLoginArgs = {
  login: aicadsProLoginContent,
};
