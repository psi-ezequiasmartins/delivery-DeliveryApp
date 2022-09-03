import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './app/context/auth.jsx';

/* Páginas */
import Site from './site/site.jsx';
import Login from './app/login/login.jsx';
import NewAccount from './app/login/novo.jsx';
import ResetPassword from './app/login/reset.jsx';

import Pedidos from './app/menu/pedidos';

import Delivery from './app/menu/delivery';
import addDelivery from './app/menu/delivery/novo.jsx';
import edtDelivery from './app/menu/delivery/editar.jsx';

/*
import Clientes from './app/menu/clientes';
import NovoCliente from './app/menu/clientes/novo.jsx';
import EditarCliente from './app/menu/clientes/editar.jsx';
import Fornecedores from './app/menu/fornecedores';
import NovoFornecedor from './app/menu/fornecedores/novo.jsx';
import EditarFornecedor from './app/menu/fornecedores/editar.jsx';
import Produtos from './app/menu/produtos';
import NovoProduto from './app/menu/produtos/novo.jsx';
import EditarProduto from './app/menu/produtos/editar.jsx';
import Estoque from './app/menu/estoque/home.jsx';
import Financeiro from './app/menu/financeiro/home.jsx';
*/

function App() {
  const {logged} = useContext(AuthContext);

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
        <SecureRoute exact path='/app/menu/delivery' component={Delivery} />
        <SecureRoute exact path='/app/menu/delivery/novo' component={addDelivery} />
        <SecureRoute exact path='/app/menu/delivery/editar/:id' component={edtDelivery}/>
        {/*
        <SecureRoute exact path='/app/menu/clientes' component={Clientes} />
        <SecureRoute exact path='/app/menu/clientes/novo' component={NovoCliente} />
        <SecureRoute exact path='/app/menu/clientes/editar/:id' component={EditarCliente}/>
        <SecureRoute exact path='/app/menu/fornecedores' component={Fornecedores} />
        <SecureRoute exact path='/app/menu/fornecedores/novo' component={NovoFornecedor} />
        <SecureRoute exact path='/app/menu/fornecedores/editar/:id' component={EditarFornecedor}/>
        <SecureRoute exact path='/app/menu/produtos' component={Produtos} />
        <SecureRoute exact path='/app/menu/produtos/novo' component={NovoProduto} />
        <SecureRoute exact path='/app/menu/produtos/editar/:id' component={EditarProduto}/>
        */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
