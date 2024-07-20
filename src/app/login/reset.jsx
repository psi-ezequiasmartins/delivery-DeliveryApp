import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebase_app } from '../../config/apiFirebase';
import './reset.css';

function Reset() {
  const auth = getAuth(firebase_app);
  var ano = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  async function ChangePassword() {
    sendPasswordResetEmail(auth, email).then((result) => {
      setMessage("Email de Recuperação enviado com sucesso! Confira sua caixa de Entrada.");
      setResult('S');
    }).catch(error => {
      setMessage('Erro ao enviar email: ' + error.message);
      setResult('N');
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
        {/* <div className="login-links mt-2">
          <Link to="/app/login/novo" className="mx-3">Criar uma conta</Link>
        </div> */}
        <button onClick={ChangePassword} className="w-150 btn btn-lg btn-dark" type="submit">ENVIAR</button>
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}

export default Reset;

/*
import React, { useState } from 'react';
import './reset.css';

import api from '../../config/mysql';

export default function Reset() {
  let vEmail = localStorage.get("email");
  let vDelivery = localStorage.getItem("delivery");
  let vToken = localStorage.getItem("token");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  async function ChangePassword() {
    setMessage('');

    if (email !== vEmail) {
      setMessage('Informe o email cadastrado ('+vDelivery+')');
      return;
    }

    if (password !== confirm_password) {
      setMessage('As senhas não conferem! Digite-as novamente');
      return;
    }
    await api.put(`update/login/delivery/${vToken} `, {"password": password}).then((result) => {
      console.log(result);
      setResult('S');
    }).catch((error) => {
      console.log(error.code, error.message);
      setMessage('Erro ao enviar Email: ' + error.message);
      setResult('N');
    })
  }

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container"> 
      <form className="form-signin">
        <a href="/#"><img className="mb-2" src="/images/logo.png" alt="" /></a>
        <h1 className="h3 mb-2 fw-normal">Recuperar Senha de Acesso</h1>

        <div className="form-floating mt-2">
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" value={email} placeholder="E-mail" />
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="form-floating mt-2">
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
          <label htmlFor="password">Defina sua Senha</label>
        </div>

        <div className="form-floating">
          <input onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirm_password" />
          <label htmlFor="confirm_password">Confirme sua Senha</label>
        </div> 

        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result.length > 0 ? <div className="alert alert-success mt-2" role="alert">{result}</div> : null}
        <button onClick={ChangePassword} className="w-150 btn btn-lg btn-dark" type="submit">ENVIAR</button>
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}
*/