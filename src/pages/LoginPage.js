import React, { useState } from 'react';
import axios from 'axios';
import OTPForm from '../components/OTPForm';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async () => {
        if (!email) {
            setError('Please enter your email');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await axios.post('http://13.217.113.139/auth/send_email_code', { email: email });
            setOtpSent(true);
            alert('OTP sent to your email');
        } catch (err) {
            setError('Failed to send OTP');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (otp) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.post('http://13.217.113.139/auth/verify_email_code', {
                email: email,
                code: otp,
            });
            console.log(response.status);
            try {
                console.log(response.data.access_token);
            }
            catch(e) {
                console.log(e)
            }

            if (response.status === 200) {

                dispatch(setToken(response.data.token));
                alert('Login successful');
            } else {
                setError('Invalid OTP');
            }
        } catch (err) {
            setError('OTP verification failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}

            {!otpSent ? (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleSendOtp} style={styles.button} disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </>
            ) : (
                <OTPForm email={email} onVerifyOtp={handleVerifyOtp} loading={loading} />
            )}
        </div>
    );
}

const styles = {
    container: {
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
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
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default LoginPage;
