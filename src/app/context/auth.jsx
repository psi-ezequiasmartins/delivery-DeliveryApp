import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props){
    let logged = localStorage.getItem("logged");
    let delivery = localStorage.getItem("delivery");
    let token = localStorage.getItem("token");

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{logged, token, delivery, user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
