import { Observable } from "rxjs";

export interface ICollection<T = any> {
  data: T;
  data$: Observable<T>;
  init?(...params: any): void;
  destroy?(): void;
}

export type ICardCollection = {
  [key in ECardType]: ICard[];
};

export interface ICard {
  id: number;
  img: string;
  name?: string;
  description?: string;
  type?: ECardType;
}

export interface IStep {
  id: number;
  title: string;
  description: string;
  audio: string;
  video: string;
  consultation: string;
  sub_question?: string;
  card_type: ECardType;
  form_code?: string;
  action?: string;
  next?: string;
}

export const enum ECardType {
  whale = 'whale',
  merlin = 'merlin'
}

export const enum ELocalStorage {
  consultation = 'consultation',
  preparation = 'preparation',
  settings = 'settings',
  consultation_menu = 'cmenu',
  payment_key = 'key'
}

export interface IDocConfig {
  host: string;
  administrator: string;
  inn: string;
  email: string;
}

export interface IDefaultResponse {
  message: string;
  uuid?: string;
}

export type TAnswerType = 'preparation' | 'consultation' | 'main-question' | 'final';
