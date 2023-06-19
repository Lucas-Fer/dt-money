import { createContext, ReactNode, useState, useEffect } from 'react';
import { axiosApi } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

// objeto com os contextos transactions

interface TransactionsContextType {
  transactions: Transaction[],
  getTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function getTransactions(query?: string) {
    const response = await axiosApi.get('/transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data);
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      getTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}