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
        theme: 'stripe', // Clean white/blue minimal design
        variables: {
            colorPrimary: '#22c55e', // green-500
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
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
