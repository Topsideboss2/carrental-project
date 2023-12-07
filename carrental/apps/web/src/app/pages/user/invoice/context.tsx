import React, { createContext } from 'react';
import { Invoice } from '@carrental/constants'

interface InvoiceContextProps {
  invoices: Invoice[]; // Replace `InvoiceType` with the actual type of your invoices
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  payModal: boolean;
  setPayModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewModal: boolean;
  setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  invoiceId: number;
  setInvoiceId: React.Dispatch<React.SetStateAction<number>>;
}

export const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);
