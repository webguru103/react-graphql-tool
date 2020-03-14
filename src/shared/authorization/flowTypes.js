import type { User } from '../../agent-panel/api/fragments/user';

export type AppUser = User & {
  isAdmin: boolean,
  isAgent: boolean,
  isCpAdmin: boolean
}
