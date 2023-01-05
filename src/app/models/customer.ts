import { Group } from './group';

export interface CustomerOption {
  id: number;
  code: string;
  description: string;
  type: string;
  order: number;
}

export interface CustomerOptionValue {
  id: number;
  code: string;
  description: string;
  order: number;
}

export interface CustomerAttribute {
  id: number;
  textValue: string;
  customerOption: CustomerOption;
  customerOptionValue: CustomerOptionValue;
}

export interface CustomerAddress {
  address: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  stateProvince: string;
  zone: string;
  billingAddress: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  storeCode: string;
  gender: string;
  billing: CustomerAddress;
  delivery: CustomerAddress;
  groups: Group[];
  language: string;
  provider: string;
  rating: number;
  ratingCount: number;
  attributes: CustomerAttribute[];
}
