import { Address } from './address';
import { Audit } from './audit';
import { Language } from './language';

export interface Merchant {
  id: number;
  name: string;
  code: string;
  email: string;
  address: Address;
  currency: string;
  currencyFormatNational: boolean;
  currentUserLanguage?: string;
  supportedLanguages: Language[];
  defaultLanguage: string;
  dimension: 'IN' | 'CM';
  weight: 'LB' | 'KG';
  inBusinessSince: string;
  logo?: string;
  parent?: Merchant;
  phone?: string;
  readableAudit?: Audit;
  template?: string;
  useCache: boolean;
  retailer: boolean;
  retailerStore?: string;
}
