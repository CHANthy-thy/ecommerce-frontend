export type Role = 'customer' | 'admin'

export function hasRole(userRole: Role | null | undefined, required: Role): boolean {
  return userRole === required
}

export function isAllowed(userRole: Role | null | undefined, required?: Role): boolean {
  if (!required) return true
  return hasRole(userRole, required)
}

