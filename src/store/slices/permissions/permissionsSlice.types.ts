export interface Role {
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  roles: string[];
}

export interface PermissionsState {
  roles: Record<string, Role>;
}
