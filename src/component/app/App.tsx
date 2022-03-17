import React from 'react';
import './App.css';
import MainTabs from '../main-tabs/MainTabs';
import { Container, Typography } from '@mui/material';
import Footer from '../footer/Footer';

function App() {
  return (
    <Container className='App'>
      <Typography variant='h1' className='AppTitle'>
        Supervisor 2
      </Typography>

      <MainTabs />

      <Footer />
    </Container>
  );
}

export default App;