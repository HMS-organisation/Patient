import React from 'react';
import { useLocation } from 'react-router-dom';
// Inline styles for dynamic background and card
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FF8A00, #FFC837)', // Vibrant gradient
    padding: '2rem',
    overflow: 'hidden',
    position: 'relative',
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    borderRadius: '1rem',
    padding: '2.5rem',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    opacity: 0, // Start with opacity 0 for fade-in effect
    transform: 'translateY(-50vh)', // Start above the viewport
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  icon: {
    width: '4rem',
    height: '4rem',
    color: '#10b981',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#333333',
    marginBottom: '0.5rem',
  },
  text: {
    fontSize: '1.125rem',
    color: '#555555',
    marginBottom: '1rem',
  },
  orderId: {
    fontWeight: '600',
    color: '#1a202c',
  },
};

// Keyframes for the animation
const keyframes = `
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-50vh);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');
  return (
    <div style={styles.container}>
      <div
        style={styles.card}
        className="animated-card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto mb-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          style={styles.icon}
        >
          <path
            fillRule="evenodd"
            d="M9.293 16.293a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586l11.293-11.293a1 1 0 111.414 1.414l-12 12z"
            clipRule="evenodd"
          />
        </svg>
        <h1 style={styles.heading}>Payment Successful</h1>
        <p style={styles.text}>Congratulations! Your payment was processed successfully.</p>
        <p style={styles.text}>
          Order ID: <span style={styles.orderId}>{orderId}</span>
        </p>
      </div>
      <style jsx>{`
        .animated-card {
          animation: slideIn 0.5s ease forwards;
        }
        ${keyframes}
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
