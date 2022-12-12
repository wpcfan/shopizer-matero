import { Address } from './address';
import { Audit } from './audit';
import { Language } from './language';

export interface Merchant {
  id: number;
  code: string;
  currency: string;
  currencyFormatNational: boolean;
  currentUserLanguage?: string;
  defaultLanguage: string;
  dimension: 'IN' | 'CM';
  email: string;
  inBusinessSince: string;
  logo?: string;
  name: string;
  parent?: Merchant;
  phone?: string;
  readableAudit?: Audit;
  retailer: boolean;
  supportedLanguages: Language[];
  template?: string;
  useCache: boolean;
  weight: 'LB' | 'KG';
  address: Address;
}
