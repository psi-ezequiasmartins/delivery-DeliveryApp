import React, { useState } from 'react';

const AuthContext = React.createContext({});

function AuthProvider(props){
    auth = getAuth(firebase_app);

    let token = localStorage.getItem("token");
    let delivery = localStorage.getItem("delivery");
    let logged = localStorage.getItem("logged");

    const [user, setUser] = useState(null);

    function setAuthUser({props}) {
        let json = {
            "vToken": props.data.token, 
            "VDelivery": props.data.delivery, 
            "vLogged": props.data.logged
        }
        setUser(json);
    }
    setAuthUser({token, delivery, logged});

    return (
        <AuthContext.Provider value={{token, delivery, logged, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
