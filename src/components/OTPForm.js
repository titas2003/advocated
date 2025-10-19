import React, { useState } from 'react';

function OTPForm({ email, onVerifyOtp, loading }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (!otp) {
      alert('Please enter OTP');
      return;
    }
    onVerifyOtp(otp);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default OTPForm;
