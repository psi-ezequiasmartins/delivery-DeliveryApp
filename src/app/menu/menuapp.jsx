import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import './menuapp.css';

function MenuApp() {  
  const {setLogged} = useContext(AuthContext);

  function LougOut() {
    setLogged(false);
    localStorage.removeItem("logged");
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a href="/" onClick={LougOut} className="navbar-brand">
          <img src="/imagens/favicon.png" alt="" height="32" className="d-inline-block align-text-top"/>
          <span className="logotipo">&nbsp;DeliveryBairro.com</span>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link to="/app/menu/pedidos/" className="nav-link" aria-current="page">Pedidos</Link>
            </li>
            <li className="nav-item">
              <Link to="/app/menu/produtos" className="nav-link" aria-current="page">Cardápio de Produtos</Link>
            </li>
            <li className="nav-item">
              <Link to="/app/menu/clientes/" className="nav-link" aria-current="page">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link to="/app/menu/delivery/" className="nav-link" aria-current="page">Dados do Delivery</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={LougOut} className="nav-link logout" aria-current="page">Sair</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuApp;
