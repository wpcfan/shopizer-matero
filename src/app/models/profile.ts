export interface Group {
  id: number;
  name: string;
  type?: string;
}

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
