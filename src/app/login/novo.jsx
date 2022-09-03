import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../config/api_firebase';
import 'firebase/auth';
import './novo.css';

function Novo() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  function RegisterNewUser() {
    setMessage('');

    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
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
        setMessage('E-mail já está em uso por outra conta');
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
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
          <label htmlFor="floatingInput">E-mail</label>
        </div>
        <div className="form-floating mt-2">
          <input onChange={e => setPassword(e.target.value)} type="text" className="form-control" id="floatingPassword" placeholder="Senha"/>
          <label htmlFor="floatingPassword">Senha</label>
        </div>       
        {/* <div className="form-floating"-->
          <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"/>
          <label htmlFor="floatingPassword">Confirme a Senha</label>
        </div> */}
        <div className="form-links">
          <Link to="/app" className="mx-3">Já tenho uma conta</Link>
        </div>
        <button onClick={RegisterNewUser} className="w-100 btn btn-lg btn-dark mt-2" type="button">REGISTRAR CONTA</button>
        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result === 'S' ? <Redirect to='/app/menu/pedidos/' /> : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>      
    </div>
  );
}

export default Novo;
