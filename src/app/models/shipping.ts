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

export class ShippingPackage {
  code!: string;
  itemName?: string;
  shippingHeight?: number;
  shippingLength?: number;
  shippingMaxWeight?: number;
  shippingQuantity?: number;
  shippingWeight?: number;
  shippingWidth?: number;
  treshold?: number;
  type?: string;
  get id(): string {
    return this.code;
  }
}
