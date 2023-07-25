// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import UserDataForm from './components/FirstPage';
import DataTable from './components/DataTable';
import DepartmentListUI from './components/DepartmentList'; // <-- Import the new component

const App: React.FC = () => {
  // Hardcoded department data
  const data = [
    {
      "department": "customer_service",
      "sub_departments": [
        "support",
        "customer_success"
      ]
    },
    {
      "department": "design",
      "sub_departments": [
        "graphic_design",
        "product_design",
        "web_design"
      ]
    }
    ];
  

  return (
    <Router>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Department List App
          </Typography>
          <Routes>
            <Route path="/data-table" element={<DataTable />} />
            <Route path="/" element={<UserDataForm />} />
          </Routes>
          <DepartmentListUI data={data} /> {/* Pass the hardcoded department data here */}
        </Box>
      </Container>
    </Router>
  );
};

export default App;
