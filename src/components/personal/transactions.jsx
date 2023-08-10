import React, { useState } from 'react';

function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch transactions from an API
  const fetchTransactions = () => {
    // Fetch transaction data from an API
    fetch('https://localhost:9000/transactions')
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  // Function to handle transaction status change
  const handleStatusChange = (transactionId, newStatus) => {
    // Update the status of the selected transaction
    const updatedTransactions = transactions.map(transaction => {
      if (transaction.id === transactionId) {
        return {
          ...transaction,
          status: newStatus
        };
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1>Transaction Dashboard</h1>

      <button onClick={fetchTransactions}>Fetch Transactions</button>

      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
              <td>
                {transaction.status === 'Pending' && (
                  <button onClick={() => handleStatusChange(transaction.id, 'Completed')}>
                    Complete
                  </button>
                )}
                {transaction.status === 'Pending' && (
                  <button onClick={() => handleStatusChange(transaction.id, 'Cancelled')}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDashboard;
