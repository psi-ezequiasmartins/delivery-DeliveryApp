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
//verificação em 20-07-2024 16:57
export default App;