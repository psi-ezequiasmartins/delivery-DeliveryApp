/**
 * src/App.js
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Rotas from './rotas';

function App() {
  return (
    <AuthProvider>
      <Rotas/>
    </AuthProvider>
  );
}

export default App;