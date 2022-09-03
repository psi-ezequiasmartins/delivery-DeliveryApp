import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props){
    let isLogged = localStorage.getItem("logged");
    const [logged, setLogged] = useState(isLogged === "S" ? true : false);
    return (
        <AuthContext.Provider value={{logged, setLogged}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};