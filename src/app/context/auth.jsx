import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props){
    let isLogged = localStorage.getItem("logged");
    let empresa = localStorage.getItem("empresa");
    let token = localStorage.getItem("token");
    
    const [logged, setLogged] = useState(isLogged === "S" ? true : false);
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider value={{logged, setLogged, user, setUser, token, empresa}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};