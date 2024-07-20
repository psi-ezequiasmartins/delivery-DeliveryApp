/**
 * src/app/login/login.jsx
 */

import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/loading/loading';
import './novo.css';

export default function Novo() {
  const [ loading, message, result, signUp ] = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container">
      <form className="form-login">

        <a href="/#">
          <img className="mb-4" src="/imagens/favicon.png" alt="" />
        </a>

        <h1 className="h3 mb-2 fw-normal">Novo Usuário</h1>

        <div className="form-floating mt-2">
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" value={email} />
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="form-floating mt-2">
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
          <label htmlFor="password">Defina sua Senha</label>
        </div>

        <div className="form-floating mt-2">
          <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirm_password" />
          <label htmlFor="confirm_password">Confirme sua Senha</label>
        </div> 

        <button onClick={()=>signUp(email, password, confirm_password)} className="w-100 btn btn-lg btn-dark mt-2" type="button">CADASTRAR ACESSO</button>

        <div className="form-links">
          <Link to="/app/login" className="mx-3">Já tenho uma conta</Link>
        </div>

        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}

        {result === 'S' ? <Navigate to='/app/delivery/'/> : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
      {loading && <Loading />}
    </div>
  );
}
