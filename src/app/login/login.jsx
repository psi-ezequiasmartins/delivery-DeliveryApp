/**
 * Login de Acesso
 */

import React, { useState } from 'react';
import Loading from '../../components/loading/loading';
import { Link, Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import { firebase_app } from '../../config/firebase';

import './login.css';

export default function Login() {
  const auth = getAuth(firebase_app);
  const database = getDatabase(firebase_app);
  const db = ref(database);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const [showLoading, setShowLoading] = useState(false);

  function signIn() {
    setShowLoading(true);
    signInWithEmailAndPassword(auth, email, password).then(async(result) => {
      // SIGNED IN
      const id = result.user.uid;
      await get(child(db, `users/${id}`)).then(async(snapshot) => {
        localStorage.setItem("token", snapshot.val().DeliveryID);
        localStorage.setItem("delivery", snapshot.val().DeliveryName);
        localStorage.setItem("logged", true);
      });
      setShowLoading(false);
      setResult('S');
    }).catch((error) => {
      console.log(error.code, error.message);
      setShowLoading(false);
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
          <label htmlFor="floatingInput">Email</label>
          <input onChange={ChangeMail} type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
        </div>
        <div className="form-floating">
          <label htmlFor="floatingPassword">Senha</label>
          <input onChange={ChangePassword} type="password" className="form-control" id="floatingPassword" placeholder="Senha"/>
        </div>
        <div className="form-links">
          <Link to="/app/login/reset" className="mx-3">Esqueci minha senha!</Link><br/>
          <Link to="http://deliverybairro.com/#planos-e-precos" className="mx-3">Ainda não possui Conta? Junte-se a nós!</Link>
        </div>
        <button onClick={signIn} className="btn btn-lg btn-dark mt-2 w-100" type="button">ENTRAR</button>

        {result === 'N' ? <div className="alert alert-danger mt-2" role="alert">E-mail e/ou senha inválidos!</div> : null}
        {result === 'S' ? <Navigate to='/app/pedidos/'/> : null}

        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>

      {showLoading && <Loading />}

    </div>
  )
}
