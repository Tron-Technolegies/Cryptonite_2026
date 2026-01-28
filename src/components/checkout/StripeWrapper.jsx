import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../ui/Loading';

// Replace with your actual publishable key or environment variable
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx'; 
const stripePromise = loadStripe(STRIPE_KEY);

const StripeWrapper = ({ clientSecret, children }) => {
  if (!clientSecret || !stripePromise) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
        theme: 'night',
        variables: {
            colorPrimary: '#4ade80', // green-400
            colorBackground: '#1f2937', // gray-800
            colorText: '#f3f4f6', // gray-100
            colorDanger: '#ef4444', // red-500
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
        },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
