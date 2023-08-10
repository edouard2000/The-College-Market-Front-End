import React, { useState, useEffect } from 'react';

function TradingDashboard() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch stocks data from an API
    fetch('https://api.example.com/stocks')
      .then(response => response.json())
      .then(data => {
        setStocks(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
        setIsLoading(false);
      });
  }, []);

  const handleStockSelect = stock => {
    setSelectedStock(stock);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Trading Dashboard</h1>

      <div className="stock-list">
        {stocks.map(stock => (
          <div
            key={stock.id}
            className={`stock ${selectedStock === stock ? 'selected' : ''}`}
            onClick={() => handleStockSelect(stock)}
          >
            <div className="stock-name">{stock.name}</div>
            <div className="stock-price">{stock.price}</div>
          </div>
        ))}
      </div>

      <div className="stock-details">
        {selectedStock ? (
          <div>
            <h2>{selectedStock.name}</h2>
            <div>Price: {selectedStock.price}</div>
            <div>Volume: {selectedStock.volume}</div>
            {/* Additional stock details */}
          </div>
        ) : (
          <div>Select a stock to view details</div>
        )}
      </div>
    </div>
  );
}

export default TradingDashboard;
