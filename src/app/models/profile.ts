import { Group } from './group';

export interface Permission {
  id: number;
  name: string;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  merchant: string;
  active: boolean;
  lastAccess?: Date;
  loginTime?: Date;
  defaultLanguage: string;
  groups: Group[];
  permissions: Permission[];
}
