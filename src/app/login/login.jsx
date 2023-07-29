import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import './login.css';

import api from '../../config/mysql';

export default function Login() {
  const { setLogged } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  async function LoginUser() {
    const json = {
      "email": email,
      "password": password 
    }
    await api.post('/logged/dlvry', json).then(response => {
      console.log(response.data[0]);
      let uid = response.data[0].DeliveryID;
        localStorage.setItem("delivery", response.data[0].DeliveryName);
        localStorage.setItem("token", response.data[0].DeliveryID);
        localStorage.setItem("logged", "S");
        setLogged(true);
        setResult('S');
    }).catch((error) => {
      console.log(error.code, error.message);
      localStorage.setItem("logged", "N");
      setLogged(false);
      setResult('N');
    });
  }

  function ChangeMail(event) {
    setEmail(event.target.value);
  }

  function ChangePassword(event) {
    setPassword(event.target.value);
  }

  var ano = new Date().getFullYear();

  return (

    <div className="d-flex align-items-center text-center form-container">
      <form className="form-signin">
        <a href="/#">
          <img className="mb-4" src="/images/logo.png" alt="" />
        </a>
        <div className="form-floating">
          <input onChange={ChangeMail} type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input onChange={ChangePassword} type="password" className="form-control" id="floatingPassword" placeholder="Senha"/>
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <div className="form-links">
          <Link to="/app/login/reset" className="mx-3">Esqueci minha senha!</Link><br/>
          <Link to="/app/login/novo" className="mx-3">Ainda não possui Conta? Junte-se a nós!</Link>
        </div>
        <button onClick={LoginUser} className="btn btn-lg btn-dark mt-2 w-100" type="button">ENTRAR</button>

        {result === 'N' ? <div className="alert alert-danger mt-2" role="alert">E-mail e/ou senha inválidos!</div> : null}
        {result === 'S' ? <Navigate to='/app/pedidos/'/> : null}

        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  )
}
