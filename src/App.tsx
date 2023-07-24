// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from './components/FirstPage';
import DepartmentList from './components/DepartmentList';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  const data: never[] = [
    // Your hardcoded JSON data here
  ];

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Department List
        </Typography>
        <Switch>
            <Route exact path="/">
              <LoginForm />
            </Route>
            <Route path="/data-table">
              <DataTable />
              <DepartmentList data ={data}/>
            </Route>
          </Switch>
      </Box>
    </Container>
  );
};

export default App;
