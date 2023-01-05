import { Description } from './description';

export interface ContentBox {
  id: number;
  code: string;
  contentType: string;
  visible: boolean;
  descriptions: Description[];
}

export interface ContentPage {
  id: number;
  code: string;
  contentType: string;
  visible: boolean;
  linkToMenu: boolean;
  descriptions: Description[];
}

export interface ContentImage {
  id: string;
  dir: boolean;
  name: string;
  path: string;
  url: string;
  size?: string;
}

export interface Content {
  name: string;
  contentType: string;
  path: string;
}

export interface ContentFolder {
  path: string;
  content: Content[];
}
