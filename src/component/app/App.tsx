import React from 'react';
import './App.css';
import MainTabs from '../main-tabs/MainTabs';
import { Container } from '@mui/material';

function App() {
  return (
    <Container className='App'>
      <div className='AppTitle'>
        Supervisor 2
      </div>
      <MainTabs />
    </Container>
  );
}

export default App;