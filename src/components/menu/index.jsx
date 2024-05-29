import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import logomarca from '../../assets/logomarca.png';

function Menu(props) {
  const activeLink    = "nav-link active";
  const inactiveLink  = "nav-link text-white";

  function LougOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("delivery");
    localStorage.removeItem("logged");
  }

  return (
    <div className="menu" id="menu">
    
      <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">    {/* <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"> */}
        <a href="/" onClick={LougOut} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img src={logomarca} className="img-logo" width="180px" alt="logo" /><br/>
        </a>
        <p></p>
        <span class="fs-4">Menu Principal</span>
        <span></span>

        <ul class="nav nav-pills flex-column mb-auto">
          <hr/>
          <li className="nav-item">
            <Link to="/app/pedidos" className={props.page === "pedidos" ? activeLink : inactiveLink} aria-current="page">
              <i className="fs-4 bi-bar-chart"></i> <span className="ms-1 d-none d-sm-inline">Pedidos</span>
            </Link>
          </li>

          <li>
            <Link to="/app/produtos" className={props.page === "produtos" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-tags"></i> <span className="ms-1 d-none d-sm-inline">Produtos</span>
            </Link>
          </li>

          <li>
            <Link to="/app/extras" className={props.page === "extras" ? activeLink : inactiveLink}>
              <i class="fs-4 bi-paperclip"></i> <span className="ms-1 d-none d-sm-inline">Acréscimos</span>
            </Link>
          </li>

          <li>
            <Link to="/app/delivery" className={props.page === "delivery" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-wallet2"></i> <span className="ms-1 d-none d-sm-inline">Delivery</span>
            </Link>
          </li>
          <li>
            <Link to="/app/config" className={props.page === "config" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-gear"></i> <span className="ms-1 d-none d-sm-inline">Configurações</span>
            </Link>
          </li>
          <hr/>
          <li>
            <Link to="/" onClick={LougOut} className={props.page === "logout" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">Sair (LogOut)</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;

/**
  <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          Orders
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
          Products
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
          Customers
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>

 */

