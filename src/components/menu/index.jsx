/**
* src/components/menu/index.jsx
*/

import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import imgLogo from '../../assets/logomarca.png';
import imgLogoMini from '../../assets/logo.png';  // nova imagem menor

function Menu(props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <img src={isMobile ? imgLogoMini : imgLogo} className="img-logo" alt="logo" /><br/>
        </a>
        <p></p>
        <span className="fs-4">{isMobile ? 'Menu' : 'Menu Principal'}</span>

        <ul className="nav nav-pills flex-column mb-auto">
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
              <i className="fs-4 bi-paperclip"></i> <span className="ms-1 d-none d-sm-inline">Acréscimos</span>
            </Link>
          </li>

          <li>
            <Link to="/app/delivery" className={props.page === "delivery" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-wallet2"></i> <span className="ms-1 d-none d-sm-inline">Delivery</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/app/config" className={props.page === "config" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-gear"></i> <span className="ms-1 d-none d-sm-inline">Configurações</span>
            </Link>
          </li> */}
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
