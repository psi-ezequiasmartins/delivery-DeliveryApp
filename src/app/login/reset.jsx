import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './reset.css';
import firebase from '../config/api_firebase';
import 'firebase/auth';

function Reset() {

  var ano = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  function ChangePassword() {
    firebase.auth().sendPasswordResetEmail(email).then(result => {
      setMessage('');
      setResult('Email enviado com sucesso!');
    }).catch(erro => {
      setMessage('Erro ao enviar email: ' + erro.message);
      setResult('');
    })
  }

  return (
    <div className="d-flex align-items-center text-center form-container"> 
      <form className="form-signin">
        <a href="/#"><img className="mb-2" src="/imagens/logo.png" alt="" /></a>
        <h1 className="h3 mb-2 fw-normal">Recuperar Acesso</h1>
        <div className="form-floating">
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result.length > 0 ? <div className="alert alert-success mt-2" role="alert">{result}</div> : null}
        <div className="login-links mt-2">
          <Link to="/app/login/novo" className="mx-3">Criar uma conta</Link>
        </div>
        <button onClick={ChangePassword} className="w-150 btn btn-lg btn-dark" type="submit">ENVIAR</button>
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}

export default Reset;
