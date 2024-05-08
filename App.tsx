import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/Routes/routes';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}