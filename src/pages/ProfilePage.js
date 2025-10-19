import React from 'react';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
    const location = useLocation();
    const email = location.state?.email;

    return (
        <div style={styles.container}>
            <h2>Welcome to Your Profile</h2>
            <p><strong>Email:</strong> {email}</p>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    }
};

export default ProfilePage;
