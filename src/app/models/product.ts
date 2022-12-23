import { Category } from './category';
import { Description } from './description';
import { Image } from './image';
import { Manufacturer } from './manufacturer';
import { ProductAttribute } from './product-attribute';
import { ProductOption } from './product-option';
import { ProductType } from './product-type';

export interface ProductSpecification {
  dimensionUnitOfMeasure: 'cm' | 'cu' | 'ft' | 'in' | 'm';
  height: number;
  length: number;
  manufacturer: string;
  model: string;
  weight: number;
  weightUnitOfMeasure: 'g' | 'kg' | 'l' | 'lb' | 'T';
  width: number;
}

export interface ProductPrice {
  id: number;
  finalPrice: string;
  discounted: boolean;
  originalPrice: string;
  description?: Description;
  descriptions?: Description[];
}

export interface Product {
  id: number;
  identifier: string;
  productShipeable: boolean;
  available: boolean;
  visible: boolean;
  virtual: boolean;
  sortOrder: number;
  dateAvailable: string;
  creationDate: string;
  price: number;
  sku: string;
  preOrder: boolean;
  productVirtual: boolean;
  quantity: number;
  quantityOrderMaximum: number;
  quantityOrderMinimum: number;
  productIsFree: boolean;
  productSpecifications: ProductSpecification;
  rating: number;
  ratingCount: number;
  refSku: string;
  rentalDuration: number;
  rentalPeriod: number;
  description?: Description;
  descriptions?: Description[];
  productPrice: ProductPrice;
  finalPrice: string;
  originalPrice: string;
  discounted: boolean;
  image?: string;
  images: Image[];
  manufacturer?: Manufacturer;
  attributes: ProductAttribute[];
  options: ProductOption[];
  type: ProductType;
  properties: ProductAttribute[];
  categories: Category[];
  canBePurchased: boolean;
  shipeable: boolean;
  variants: Product[];
}
