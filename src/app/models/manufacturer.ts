export interface ManufacturerDescription {
  id: number;
  description: string;
  friendlyUrl?: string;
  highlights: string;
  keyWords: string;
  language: string;
  metaDescription: string;
  name: string;
  title: string;
}

export interface Manufacturer {
  id: number;
  code: string;
  description?: ManufacturerDescription;
  descriptions?: ManufacturerDescription[];
  order: number;
}
