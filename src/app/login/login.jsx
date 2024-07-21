/**
 * Login de Acesso
 */

import React, { useState, useContext } from 'react';
import Loading from '../../components/loading/loading';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

export default function Login() {
  const { loading, msg, result, signIn } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container">
      <form className="form-login">

        <a href="/#">
          <img className="mb-4" src="/images/logo.png" alt="" />
        </a>

        <h1 className="h3 mb-2 fw-normal">Olá! Seja bem vindo!</h1>

        <div className="form-floating mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="E-mail"/>
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="form-floating mt-2">
          <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Senha"/>
          <label htmlFor="password">Senha</label>
        </div>

        <button onClick={()=>signIn(email, password)} className="btn btn-lg btn-dark mt-2 w-100" type="button">ENTRAR</button>

        <div className="form-links">
          <Link to="/app/login/reset" className="mx-3">Esqueci minha senha!</Link><br/>
          <Link to="/app/login/novo" className="mx-3">Ainda não possui Conta? Junte-se a nós!</Link> 
        </div>

        {msg > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
        {result === 'S' ? <Navigate to="/app/pedidos" /> : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
      {loading && <Loading />}
    </div>
  )
}

{/*http://deliverybairro.com/#planos-e-precos*/}
