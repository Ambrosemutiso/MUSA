import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/mpesa/stkpush', {
        phoneNumber, // Change this key to 'phone'
        accountRef: 'MUSA', // Include any other required fields
        transactionDesc: 'Payment for MUSA', // Example transaction description
      });
      console.log(response.data);
      setMessage('STK Push initiated to MUSA. Check your phone to complete the payment.');
    } catch (error) {
      setMessage('Error processing payment. Try again.');
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Pay to MUSA</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              value={500}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${loading && 'cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Pay Ksh 500'
            )}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center">
            <p className="text-green-600">{message}</p>
            {message.includes('initiated') && (
              <div className="relative w-full bg-gray-200 h-2 rounded mt-4">
                <div
                  className="absolute bg-green-500 h-2 rounded"
                  style={{
                    width: '100%',
                    animation: 'progress 5s linear reverse',
                  }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
