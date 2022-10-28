import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './app/context/auth.jsx';

/* Páginas */
import Site from './site/site.jsx';
import Login from './app/login/login.jsx';
import NewAccount from './app/login/novo.jsx';
import ResetPassword from './app/login/reset.jsx';

import Pedidos from './app/menu/pedidos';
import Produtos from './app/menu/produtos';
import Clientes from './app/menu/clientes';
import Delivery from './app/menu/delivery';

function App() {
  const {logged} = useContext(AuthContext); // acrescentar nivel de acesso no contexto

  function SecureRoute({...params}) {
    if (!logged) {
      return <Redirect to="/#" />
    } else {
    return <Route {...params} />
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Site} />
        <Route exact path='/app' component={Login} />
        <Route exact path='/app/login/novo' component={NewAccount} />
        <Route exact path='/app/login/reset' component={ResetPassword} />
        {/* ---------------------------------------------------------------------------- */}
        <SecureRoute exact path='/app/menu/pedidos' component={Pedidos} />
        <SecureRoute exact path='/app/menu/produtos' component={Produtos} />
        <SecureRoute exact path='/app/menu/clientes' component={Clientes} />
        <SecureRoute exact path='/app/menu/delivery' component={Delivery} />
        {/* ---------------------------------------------------------------------------- */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
