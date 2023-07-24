// src/SecondPage.tsx
import React, { useEffect, useState } from 'react';

const SecondPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch user details from local storage on component mount
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  if (!userDetails) {
    return <div>You must enter your details first. Redirecting...</div>;
  }

  return (
    <div>
      <h1>Second Page</h1>
      <div>
        <strong>Name:</strong> {userDetails.name}
      </div>
      <div>
        <strong>Phone Number:</strong> {userDetails.phoneNumber}
      </div>
      <div>
        <strong>Email:</strong> {userDetails.email}
      </div>
    </div>
  );
};

export default SecondPage;
