import {IDefaultResponse} from "./content";

export interface IPaymentResponse extends IDefaultResponse {
  payment: IPayment;
}

export interface IPayment {
  id: string;
  status: TPaymentStatus;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  recipient?: {
    account_id: string;
    gateway_id: string;
  };
  created_at: string;
  confirmation?: {
    type: string;
    confirmation_url: string;
  };
  test: boolean;
  paid: boolean;
  refundable?: boolean;
  metadata?: any;
}

export type TPaymentStatus = 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';

export interface IPaymentLocalData {
  key: string;
  paymentId: string;
  status: TPaymentStatus;
}
