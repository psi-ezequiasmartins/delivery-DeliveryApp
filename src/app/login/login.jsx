import { useState, useContext } from 'react';
import { Link, redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { firebase_app } from '../config/config.firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import './login.css';

function Login() {
  const auth = getAuth(firebase_app);
  const database = getDatabase(firebase_app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const {setLogged} = useContext(AuthContext);

  async function LoginUser() {
    await signInWithEmailAndPassword(auth, email, password).then((firebaseUser) => {
      let uid = firebaseUser.user.uid;
      console.log("UserID: ", uid);
      database.ref('users/' + uid).on('value', (snapshot) => {
        console.log("Delivery: ", snapshot.val().delivery);
        localStorage.setItem("delivery", snapshot.val().delivery);
        console.log("DeliveryID: ", snapshot.val().token);
        localStorage.setItem("token", snapshot.val().token);
        localStorage.setItem("logged", "S");
        setLogged(true);
        setResult('S');
      })
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
          <img className="mb-4" src="/imagens/logo.png" alt="" />
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
          <Link to="/app/login/reset" className="mx-3">Esqueci minha senha!</Link>
          <Link to="/app/login/novo" className="mx-3">Ainda não possui Conta? Junte-se a nós!</Link>
        </div>
        <button onClick={LoginUser} className="btn btn-lg btn-dark mt-2 w-100" type="button">ENTRAR</button>
        {result === 'N' ? <div className="alert alert-danger mt-2" role="alert">E-mail e/ou senha inválidos!</div> : null}
        {result === 'S' ? redirect('/app/pedidos/') : null}
        <p>&copy; 1999-{ano} PSI-SOFTWARE</p>
      </form>
    </div>
  )
}

export default Login;
