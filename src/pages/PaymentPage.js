import React, { useState } from 'react';
import './PaymentPage.css';

function PaymentPage({ totalPrice }) {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    // Simulate a successful payment
    setPaymentStatus('Payment Successful!');
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Payment Page</h2>
        <h3 className="payment-amount">Total: ₹{totalPrice}</h3>

        {paymentStatus ? (
          <div className="payment-status success">
            <h4>{paymentStatus}</h4>
          </div>
        ) : (
          <button className="payment-button" onClick={handlePayment}>
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
