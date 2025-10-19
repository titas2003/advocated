import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";


const NewUserModal = ({ onClose, onSuccess }) => {
  const token = useSelector((state) => state.auth.token);
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("client");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Decode token to get email
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!fullName || !dob || !phone || !street || !city || !stateVal || !pinCode || !country) {
      setError("Please fill all fields");
      return;
    }

    const payload = {
      email: email,
      full_name: fullName,
      role: role,
      dob: new Date(dob).toISOString(),
      phone: phone,
      address: {
        street: street,
        city: city,
        state: stateVal,
        pin_code: pinCode,
        country: country
      },
      created_at: new Date().toISOString()
    };

    console.log("Payload being sent:", payload);

    try {
      setLoading(true);
      setError("");
      const response = await axios.put("http://13.217.113.139/users/update_basic_info", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // optional if your API requires auth
        }
      });
      console.log("User created:", response.data);
      onSuccess(); // navigate to profile or close modal
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit user info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Complete Your Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Email auto-filled and disabled */}
        <input value={email} disabled placeholder="Email" />

        <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} />

        <input value={street} onChange={e => setStreet(e.target.value)} placeholder="Street" />
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
        <input value={stateVal} onChange={e => setStateVal(e.target.value)} placeholder="State" />
        <input value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="PIN Code" />
        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button onClick={onClose} style={{ backgroundColor: "grey" }}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default NewUserModal;
