import React, { useState } from 'react';

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    companyName: "goMart",
    ownerName: "Rahul",
    rollNo: "1",
    ownerEmail: "rahul@abc.edu",
    accessCode: "HVIQBVbqmTGEmaED"
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://20.244.56.144/products/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Company registered successfully!');
      } else {
        console.error('Failed to register company:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error registering company:', error);
      // Handle any network errors or exceptions here
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" value={registrationData.companyName} onChange={handleInputChange} placeholder="Company Name" readOnly />
      <input type="text" name="ownerName" value={registrationData.ownerName} onChange={handleInputChange} placeholder="Owner Name" readOnly />
      <input type="text" name="rollNo" value={registrationData.rollNo} onChange={handleInputChange} placeholder="Roll No" readOnly />
      <input type="email" name="ownerEmail" value={registrationData.ownerEmail} onChange={handleInputChange} placeholder="Owner Email" readOnly />
      <input type="text" name="accessCode" value={registrationData.accessCode} onChange={handleInputChange} placeholder="Access Code" readOnly />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
