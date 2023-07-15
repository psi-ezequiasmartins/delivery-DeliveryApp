import { useState } from 'react';
import { firebase_app } from '../config/config.firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import './reset.css';

function Reset() {
  const auth = getAuth(firebase_app);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  async function ChangePassword() {
    sendPasswordResetEmail(auth, email).then(result => {
      setMessage('');
      setResult('Email enviado com sucesso! Confira o link de recuperação enviado para seu Email.');
    }).catch((error) => {
      console.log(error.code, error.message);
      setMessage('Erro ao enviar Email: ' + error.message);
      setResult('');
    })
  }

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container"> 
      <form className="form-signin">
        <a href="/#"><img className="mb-2" src="/imagens/logo.png" alt="" /></a>
        <h1 className="h3 mb-2 fw-normal">Recuperar Senha de Acesso</h1>
        <div className="form-floating">
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result.length > 0 ? <div className="alert alert-success mt-2" role="alert">{result}</div> : null}
        <button onClick={ChangePassword} className="w-150 btn btn-lg btn-dark" type="submit">ENVIAR</button>
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}

export default Reset;
