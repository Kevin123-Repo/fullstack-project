import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'react-bootstrap'; 

const UpdateProfile = ({ userId, profileData, onUpdate }) => {
  const [firstName, setFirstName] = useState(profileData?.first_name || '');
  const [lastName, setLastName] = useState(profileData?.last_name || '');
  const [address, setAddress] = useState(profileData?.address || '');
  const [phone, setPhone] = useState(profileData?.phone || '');
  const [postcode, setPostcode] = useState(profileData?.postcode || '');
  const [city, setCity] = useState(profileData?.city || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFirstName(profileData?.first_name || '');
    setLastName(profileData?.last_name || '');
    setAddress(profileData?.address || '');
    setPhone(profileData?.phone || '');
    setPostcode(profileData?.postcode || '');
    setCity(profileData?.city || '');
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'postcode':
        setPostcode(value);
        break;
      case 'city':
        setCity(value);
        break;
      default:
        break;
    }
  };

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^[0-9]{11}$/;  // Example: Only accepts 11 digit numbers
    return phoneRegex.test(phoneNumber);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setError('');

    const response = await fetch("http://localhost:3030/profile/updateUser", {
        method: "PUT",
        "Prefer": "return=representation",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          address: address,
          postcode: postcode,
          city: city,
          phone: phone,
        }),
      });
    setLoading(false);

    if (error) {
      setError('Failed to update profile. Please try again.');
      console.error(error); 
    } else {
      setShowModal(false); 
      onUpdate();
      //console.log("Updated")
    }
  };

  return (
    <div className="card" style={{ width: '25rem' }}>
      <div className="card-body">
        <h5 className="card-title">Profile Information</h5>
        <p><strong>First Name:</strong> {profileData?.first_name}</p>
        <p><strong>Last Name:</strong> {profileData?.last_name}</p>
        <p><strong>Address:</strong> {profileData?.address}</p>
        <p><strong>Phone:</strong> {profileData?.phone}</p>
        <p><strong>Postcode:</strong> {profileData?.postcode}</p>
        <p><strong>City:</strong> {profileData?.city}</p>
        <Button variant="primary" onClick={() => setShowModal(true)}>Edit Profile</Button>
      </div>

      {/* Modal to edit profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Postcode</label>
              <input
                type="text"
                className="form-control"
                name="postcode"
                value={postcode}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={city}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
