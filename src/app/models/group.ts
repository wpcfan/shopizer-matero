export interface Group {
  id: number;
  name: string;
  type:
    | 'SUPERADMIN'
    | 'ADMIN'
    | 'ADMIN_RETAILER'
    | 'ADMIN_STORE'
    | 'ADMIN_CATALOGUE'
    | 'ADMIN_ORDER'
    | 'ADMIN_CONTENT'
    | 'CUSTOMER';
}
