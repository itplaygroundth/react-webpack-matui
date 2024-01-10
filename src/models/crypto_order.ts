export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
export type PartnersStatus = 'active' | 'pending' ;
export type MembersStatus = 'active' | 'pending' ;
export type PromotionStatus = 0 | 1 | 2;
export type TransactionsStatus = 'void' | 'verified' | 'pending' ;

export interface User {
  bankname:string;
  banknumber:string;
  username:string;
  fullname:string;
}

export interface UserInfo {
  username: string;
  accessToken: string;
  isAuthenticated: boolean;
  role:string;
  avatar:string;

}

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

export interface Members {
  id: string;
  username: string;
  balance: number;
  partners_key: string;
  turnover: number;
  status:string;
}

export interface Commission {
  id: string;
  username: string;
  balance: number;
  partners_key: string;
  turnover: number;
  status:string;
}

export interface Promotion {
   id: string;
   ProName:string;
   Formular:string;
   StartDate: Date;
   StopDate: Date;
   Active: number
   IsCancel: number;
}

export interface Transactions {
  
  
  id: number;
  uid:string;
  accountno:string;
  bankname:string;
  userid:number;
  bankcode:number;
  transactionamount: number;
  beforebalance: number;
  balance: number;
  unix:number;
  transaction_date:string;
  creationDate:string;
  status:string;
  User:User;
}

export interface Turnover {
  id: string;
  username: string;
  balance: number;
  partners_key: string;
  turnover: number;
  status:string;
}