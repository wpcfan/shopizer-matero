import { Address } from './address';
import { Audit } from './audit';
import { Language } from './language';

export interface MerchantLogo {
  name: string;
  path: string;
}

export interface Merchant {
  id: number;
  name: string;
  code: string;
  email: string;
  address: Address;
  currency: string;
  currencyFormatNational: boolean;
  currentUserLanguage?: string | null;
  supportedLanguages: Language[];
  defaultLanguage: string;
  dimension: 'IN' | 'CM';
  weight: 'LB' | 'KG';
  inBusinessSince: string;
  logo?: MerchantLogo;
  parent?: Merchant | null;
  phone?: string | null;
  readableAudit?: Audit;
  template?: string | null;
  useCache: boolean;
  retailer: boolean;
  retailerStore?: string;
}
