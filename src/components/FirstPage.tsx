// src/components/UserDataForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

const UserDataForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save user details in localStorage
    localStorage.setItem('userData', JSON.stringify(formData));
    // Navigate to the second page (DataTable component)
    navigate('/data-table');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default UserDataForm;
