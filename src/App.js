/**
 * src/App.js
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Rotas from './rotas';
import 'antd/dist/reset.css'; // Se estiver usando Ant Design v5

function App() {
  return (
    <AuthProvider>
      <Rotas/>
    </AuthProvider>
  );
}

export default App;