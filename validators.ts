enum Plan {
  BASIC = 'basic',
  PRO = 'pro'
}

type PrefixAllowedResponse = {
  allowed: boolean,
  error?: string
}
export const BASIC_ALLOWED_PREFIXES = ['.', '!', '?', '-', '+', '*', '/'];

export const isValidPlan = (plan: Plan): boolean => (
  typeof plan === 'string' && Object.values(Plan).includes(plan)
)

export const prefixAllowed = (plan: Plan, prefix: string): PrefixAllowedResponse => {
  if (!isValidPlan(plan)) return { allowed: false, error: "Plan is not valid" };
  if (prefix.length > 12) return { allowed: false, error: "Prefix too long" };
  if (plan !== Plan.BASIC) return { allowed: true };

  if (BASIC_ALLOWED_PREFIXES.includes(prefix)) return { allowed: true };

  return { allowed: false, error: `Basic accounts may only use a small list of prefixes` }
}