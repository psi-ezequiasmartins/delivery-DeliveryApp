import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../config/firebase';
import 'firebase/auth';

import './novo.css';

function Novo() {
  let vEmail = localStorage.getItem("email");
  let vEmpresa = localStorage.getItem("empresa");
  let vToken = localStorage.getItem("token");

  const [email, setEmail] = useState(vEmail);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  async function RegisterNewUser(empresa, token) {
    setMessage('');

    if (password !== confirm_password) {
      setMessage('Senhas diferentes! Por favor digite-as novamente');
      return;
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async(value) => {
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).set({
        empresa: empresa,
        token: token
      });
      setResult('S');
    }).catch(error => {
      setResult('N');
      if (error.message === 'Password should be at least 6 characters') {
        setMessage('A senha deverá conter pelo menos 6 caracteres'); 
      } else 
      if (error.message === 'The email address is badly formatted.') {
        setMessage('O formato do E-mail está incorreto') 
      } else
      if (error.message === 'The email address is already in use by another account.') {
        setMessage('E-mail já em uso por outra conta');
      } else {
        setMessage('Erro ao criar conta: ' + error.message);
      }
    })
  }

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container">
      <form className="form-signin">
      <a href="/#">
          <img className="mb-4" src="/imagens/logo.png" alt="" />
        </a>

        <div className="form-floating mt-2">
          <input type="text" className="form-control" id="delivery" value={vEmpresa} readOnly />
          <input type="hidden" id="token" name="token" value={vToken} />
          <label htmlFor="delivery">Delivery</label>
        </div>

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

        <div className="form-links">
          <Link to="/app" className="mx-3">Já tenho uma conta</Link>
        </div>

        <button onClick={e => RegisterNewUser(vEmpresa, vToken)} className="w-100 btn btn-lg btn-dark mt-2" type="button">CADASTRAR ACESSO</button>
        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result === 'S' ? <Redirect to='/app/menu/pedidos' /> : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}

export default Novo;
