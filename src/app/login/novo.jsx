import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { firebase_app } from '../config/config.firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import './novo.css';

function Novo() {
  let vEmail = localStorage.getItem("email");
  let vDelivery = localStorage.getItem("delivery");
  let vToken = localStorage.getItem("token");

  const auth = getAuth(firebase_app);
  const database = getDatabase(firebase_app);

  const [email, setEmail] = useState(vEmail);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  async function RegisterNewUser(delivery, token) {
    setMessage('');

    if (!email || !password) {
      setMessage('Favor preencher todos os campos!');
      return;
    }

    if (password !== confirm_password) {
      setMessage('As senhas não conferem! Digite-as novamente');
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password).then(async(value) => {
      let uid = value.user.uid;
      console.log("UserID: ", uid);
      set(ref(database, 'users/' + uid), {
        delivery: delivery,
        token: token
      });
      setResult('S');
    }).catch((error) => {
      console.log(error.code, error.message);
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
    });
  }

  var ano = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center text-center form-container">
      <form className="form-signin">
      <a href="/#">
          <img className="mb-4" src="/imagens/logo.png" alt="" />
        </a>

        <div className="form-floating mt-2">
          <input type="text" className="form-control" id="delivery" value={vDelivery} readOnly />
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

        <button onClick={e => RegisterNewUser(vDelivery, vToken)} className="w-100 btn btn-lg btn-dark mt-2" type="button">CADASTRAR ACESSO</button>
        {message.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{message}</div> : null}
        {result === 'S' ? redirect('/app/pedidos') : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  );
}

export default Novo;
