/**
* src/components/menu/index.jsx
*/

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaPaperclip, FaStore, FaSignOutAlt } from 'react-icons/fa'; 
import { MdFastfood } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.png';  
import './index.css';

import SessionTimeOFFbyInactivity from '../session/SessionTimeOFFbyInactivity';

export default function Menu(props) {
  const { signOut } = useContext(AuthContext);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

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

  SessionTimeOFFbyInactivity(handleLogout, 900000); // (timeoff da sessão: 15 minutos = 900000 ms)

  function handleLogout() {
    signOut();
    navigate("/app/login");
  }

  const renderMenuItems = (isTabbar = false) => (
    <ul className={`nav ${isTabbar ? 'nav-justified w-100' : 'nav-pills flex-column mb-auto'}`}>
      <hr className={!isTabbar ? '' : 'd-none'} />
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/pedidos" className={props.page === "pedidos" ? activeLink : inactiveLink} aria-current="page">
          <FaUserEdit size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Pedidos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/produtos" className={props.page === "produtos" ? activeLink : inactiveLink}>
          <MdFastfood size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Produtos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/extras" className={props.page === "extras" ? activeLink : inactiveLink}>
          <FaPaperclip  size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Acréscimos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/delivery" className={props.page === "delivery" ? activeLink : inactiveLink}>
          <FaStore  size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Delivery</span>}
        </Link>
      </li>
      <hr className={!isTabbar ? '' : 'd-none'} />
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/" onClick={handleLogout} className={props.page === "Logout" ? activeLink : inactiveLink}>
          <FaSignOutAlt size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Sair (LogOut)</span>}
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* Menu Sidebar */}
      {!isMobile && (
        <div className="menu sidebar" id="menu">
          <div className="d-flex flex-column align-items-center px-2 pt-2 text-white min-vh-100">
            <a href="/" onClick={signOut} >
              <img src={logo} alt="" height="180" className="d-inline-block align-text-top" />
            </a>
            <p></p>
            <span className="fs-4">{isMobile ? 'Menu' : 'Menu Principal'}</span>
            {renderMenuItems()}
          </div>
        </div>
      )}

      {/* Menu Tabbar */}
      {isMobile && (
        <nav className="menu tabbar" id="menu">
          {renderMenuItems(true)}
        </nav>
      )}
    </>
  )
}

/*
    <div className="menu" id="menu">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">

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

          <li className="nav-item">
            <Link to="/app/produtos" className={props.page === "produtos" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-tags"></i> <span className="ms-1 d-none d-sm-inline">Produtos</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/app/extras" className={props.page === "extras" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-paperclip"></i> <span className="ms-1 d-none d-sm-inline">Acréscimos</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/app/delivery" className={props.page === "delivery" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-wallet2"></i> <span className="ms-1 d-none d-sm-inline">Delivery</span>
            </Link>
          </li>

          <hr/>

          <li className="nav-item">
            <Link to="/" onClick={LougOut} className={props.page === "logout" ? activeLink : inactiveLink}>
              <i className="fs-4 bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">Sair (LogOut)</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
*/