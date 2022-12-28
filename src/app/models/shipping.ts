export interface Expedition {
  iternationalShipping: boolean;
  shipToCountry: string[];
  taxOnShipping: boolean;
}

export interface ShippingMethod {
  code: string;
  active: boolean;
  configured: boolean;
  image: string;
  binaryImage?: any;
  requiredKeys: string[];
  configurable?: boolean;
}
