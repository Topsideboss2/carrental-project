export interface ISTKPUSH {
    amount: number;
    paymentId: number;
    mpesaNumber: string;
}

export interface IPAYMENTVALIDATION {
    merchantId: string;
    checkoutId: string;
}

export interface IMpesaRequest {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}
