import React from 'react';

function Menu() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container">

            <a className="navbar-brand" href="/#">
              <img src="imagens/favicon.png" alt="" height="32" className="d-inline-block align-text-top"/>
              <span className="logotipo">&nbsp;&nbsp;DeliveryBairro.com</span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#banner">Início</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#vantagens">Vantagens</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#depoimentos">Depoimentos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#planos-e-precos">Planos e Preços</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#mobile">Downloads (App)</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#contato">Contato</a>
                </li>
              </ul>
            </div>
          </div>
            
        </nav>

      </div>
    );
  }

export default Menu;
