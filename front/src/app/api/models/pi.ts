export interface IGPIOStatus {
  key: string;
  status: 0 | 1;
  description: string;
}

export interface IGPIO {
  id: number;
  type: TGPIO;
  name: string;
  category: TGPIOCategory[];
  description?: string;
}

export type TGPIOCategory = 'hall' | 'kids' | 'toilet';

export type TGPIO = 'out' | 'in';

export interface IUser {
  id: number;
  name: string;
  telegramId: number;
}

export interface ISettings {
  hallLightPeriod: number;
  hallLightPending: number;
  alarm: 0 | 1;
  notification: 0 | 1;
  notificationUsers: IUser[];
  alarmUsers: IUser[];
  smsSendDelay: number;
  smsUsers: IUser[];
  doorOpenedAt: string;
  waterAlarmedAt: string;
  started: string;
  imGoOut: number;
  imGoOutTimeout: number;
  nightAmbientLightStatus: number;
  ambientIds: string[];
  ambientLightPeriod: IAmbientPeriod
}

export interface IGPIOList {
  id: number;
  name: string;
  description: string;
}

export interface IAmbientPeriod {timeOn: [number, number]; timeOff: [number, number]}
