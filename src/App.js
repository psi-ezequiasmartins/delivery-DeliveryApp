/**
 * src/App.js
 */

import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import Rotas from './rotas';

function App() {
  return (
    <AuthContextProvider>
      <Rotas/>
    </AuthContextProvider>
  );
}

export default App;
