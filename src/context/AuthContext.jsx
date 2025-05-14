/**
 * src/context/AuthContext.jsx
 */

import React, { createContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebase_app } from '../config/apiFirebase';
import api from '../config/apiAxios';

const auth = getAuth(firebase_app);
const db = getDatabase();

const AuthContext = createContext();

function AuthProvider({children}){
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ msg, setMessage ] = useState('');
  const [ result, setResult ]= useState('');

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Oculta a mensagem após 3 segundos
      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [msg]);

  function signIn(email, password) {
    setMessage('');
    signInWithEmailAndPassword(auth, email, password).then(async(result) => {
      const id = result.user.uid; 

      const userData = ref(db, 'users/'+id);
      onValue(userData, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        localStorage.setItem("vID", data.DeliveryID);
        localStorage.setItem("vDelivery", data.DeliveryName);
        localStorage.setItem("vMail", data.DeliveryMail);
      });

      const vID = parseFloat(localStorage.getItem("vID"));

      try {
        const response = await api.post('/api/delivery/authenticate', {
          USER_ID: vID, // certifique-se que vID é um número
          CHV: "1",
          timezoneOffset: new Date().getTimezoneOffset()
        });

        const token = response.data?.token; // Verifica se 'data' e 'token' estão definidos
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
          api.defaults.headers.Authorization = `Bearer ${token}`;
          setAuthenticated(true);
          setResult('S');
        } else {
          throw new Error('Token não encontrado na resposta');
        }
      } catch (error) {
        console.log('Erro ao autenticar:', error);
        setAuthenticated(false);
        setMessage('E-mail e/ou senha inválidos!');
        setResult('N');
      }
    }).catch((error) => {
      console.log(error.code, error.message);
      setAuthenticated(false);
      setMessage('E-mail e/ou senha inválidos!');
      setResult('N');
    });
  }

  function signUp(delivery, email, password, confirm_password) {
    setMessage('');
    setLoading(true);

    if (!email || !password) {
      setMessage('Favor preencher todos os campos!');
      return;
    }

    if (password !== confirm_password) {
      setMessage('As senhas não conferem! Digite-as novamente');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password).then(async(result) => {
      // SIGNED IN
      const id = result.user.uid;

      set(ref(db, 'users/'+id), {
        DeliveryID: id, // substituir pelo ID resultante do cadastro do Delivery no backend
        DeliveryName: delivery,
        DeliveryMail: email
      });

      const response = await api.post('/api/authenticate', { USER_ID: id, CHV: 1 });
      const token = response.data?.token;
      if (token) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem("vID", id);
        localStorage.setItem("vDelivery", delivery);
        localStorage.setItem("vMail", email);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLoading(false);
        setAuthenticated(true);
        setMessage('Cadastro efetuado com sucesso!');
        setResult('S');
      } else {
        throw new Error('Token não encontrado na resposta');
      }
    }).catch((error) => {
      console.log(error.code, error.message);
      setLoading(false);
      setAuthenticated(false);
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

  function changePassword(email) {
    sendPasswordResetEmail(auth, email).then(() => {
      setMessage("Email de Recuperação enviado com sucesso! Confira sua caixa de Entrada.");
      setAuthenticated(false);
    }).catch(error => {
      setMessage('Erro ao enviar email: ' + error.message);
      setAuthenticated(false);
    })
  }

  function signOut() {
    setAuthenticated(false);
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem("token");
    localStorage.removeItem("vID");
    localStorage.removeItem("vDelivery");
    localStorage.removeItem("vMail");
    localStorage.removeItem("firebase:host:psi-crm-ca846-default-rtdb.firebaseio.com");
    console.clear();
  }

  return (
    <AuthContext.Provider value={{ loading, msg, result, authenticated, signIn, signUp, changePassword, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };
