'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { TransactionForm } from '@/components/transaction-form';
import { TransactionList } from '@/components/transaction-list';
import { ExpenseChart } from '@/components/expense-chart';
import { Transaction } from '@/types/transaction';

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleTransactions: Transaction[] = [
      { id: '1', amount: 120.50, date: '2024-12-15', description: 'Groceries' },
      { id: '2', amount: 45.00, date: '2024-12-14', description: 'Gas' },
      { id: '3', amount: 85.75, date: '2024-12-12', description: 'Utilities' },
      { id: '4', amount: 200.00, date: '2024-11-28', description: 'Rent' },
      { id: '5', amount: 35.25, date: '2024-11-25', description: 'Coffee' }
    ];
    setTransactions(sampleTransactions);
  }, []);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([...transactions, newTransaction]);
    setIsFormOpen(false);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction | Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    const transactionWithId: Transaction =
      'id' in updatedTransaction
        ? updatedTransaction
        : { ...updatedTransaction, id: editingTransaction.id };
    setTransactions(transactions.map(t =>
      t.id === transactionWithId.id ? transactionWithId : t
    ));
    setEditingTransaction(null);
    setIsFormOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Personal Finance Tracker
          </h1>
          <p className="text-gray-600">
            Track your expenses and visualize your spending patterns
          </p>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <PlusCircle size={20} />
            Add Transaction
          </button>
        </div>

        {/* Transaction Form */}
        {isFormOpen && (
          <TransactionForm
            transaction={editingTransaction}
            onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
            onCancel={handleCloseForm}
          />
        )}

        {/* Charts Section */}
        <ExpenseChart transactions={transactions} />

        {/* Transactions List */}
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}