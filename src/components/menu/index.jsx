/**
* src/components/menu/index.jsx
*/

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaStore, FaSignOutAlt } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { GiShoppingBag } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';

import logo from '../../assets/logo-black.png';
import './index.css';

import SessionTimeout from '../session/SessionTimeOFF.jsx';

export default function Menu(props) {
  const { signOut } = useContext(AuthContext);
  const [ isMobile, setIsMobile]  = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const handleLogout = useCallback(() => { // Envolva handleLogout com useCallback
    // console.log("Função handleLogout chamada.");
    signOut();
    navigate("/"); // retorna para a página inicial
  }, [signOut, navigate]); // Adicione signOut e navigate como dependências

  const activeLink    = "nav-link active";
  const inactiveLink  = "nav-link text-white";

  const renderMenuItems = (isTabbar = false) => (
    <ul className={`nav ${isTabbar ? 'nav-justified w-100' : 'nav-pills flex-column mb-auto'}`}>
      <hr className={!isTabbar ? '' : 'd-none'} />
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/pedidos" className={props.page === "pedidos" ? activeLink : inactiveLink} aria-current="page">
          <GiShoppingBag size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Pedidos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/produtos" className={props.page === "produtos" ? activeLink : inactiveLink}>
          <IoFastFood size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Produtos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/extras" className={props.page === "extras" ? activeLink : inactiveLink}>
          <BiFoodMenu size={24} className="icon" />
          {!isTabbar && <span className="ms-1 d-none d-sm-inline">Acréscimos</span>}
        </Link>
      </li>
      <li className={`nav-item ${isTabbar ? 'text-center' : ''}`}>
        <Link to="/app/delivery" className={props.page === "delivery" ? activeLink : inactiveLink}>
          <FaStore size={24} className="icon" />
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
      <SessionTimeout onTimeout={handleLogout} timeout={900000} /> {/* 15 minutos em milessegundos (teste: 3 minutos) */}

      {/* Menu Sidebar */}
      {!isMobile && (
        <div className="menu sidebar" id="menu">
          <div className="d-flex flex-column align-items-center px-2 pt-2 text-white min-vh-100">
            <a href="/" onClick={signOut} className="navbar-brand">
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
  );
}
