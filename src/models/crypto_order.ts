export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type PartnersStatus = 'active' | 'pending' ;
export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export interface Partners {
  id: string;
  username: string;
  balance: number;
  affiliate_key: string;
  turnover: number;
  status:string;
}