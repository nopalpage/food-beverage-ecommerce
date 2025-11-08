import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo'
);

// Stripe payment processing
export const processPayment = async (paymentData) => {
  try {
    const stripe = await stripePromise;
    
    // Create payment intent on your server
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        currency: 'usd',
        customerEmail: paymentData.customerEmail,
        items: paymentData.items
      }),
    });

    const { clientSecret } = await response.json();

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: paymentData.cardElement,
        billing_details: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          address: paymentData.address
        }
      }
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      paymentIntent: result.paymentIntent
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Stripe elements styling
export const stripeElementsOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Payment methods configuration
export const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: '💳',
    description: 'Pay with credit or debit card'
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    icon: '🍎',
    description: 'Pay with Apple Pay'
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    icon: '🔵',
    description: 'Pay with Google Pay'
  }
];

// Webhook handlers
export const handleStripeWebhook = async (event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      console.log('Payment succeeded:', event.data.object);
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      console.log('Payment failed:', event.data.object);
      break;
    case 'customer.created':
      // Handle new customer
      console.log('Customer created:', event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};