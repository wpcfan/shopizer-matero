import { Zone } from './zone';
export interface Country {
  id: number;
  name: string;
  code: string;
  supported: boolean;
  zones: Zone[];
}
