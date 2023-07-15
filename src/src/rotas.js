import { BrowserRouter, Route, Routes } from "react-router-dom";

import Site from "./site/site";
import Login from "./app/login/login";
import NewAccount from "./app/login/novo";
import Reset from "./app/login/reset";
import Pedidos from "./app/pedidos";
import Produtos from "./app/produtos";
import Delivery from "./app/delivery";
import Config from "./app/config";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site />} />
                <Route path='/app/login' component={<Login />} />
                <Route path='/app/login/novo' component={<NewAccount />} />
                <Route path='/app/login/reset' component={<Reset />} />
                {/*----------------------------------------------------------*/}
                <Route path="/app/pedidos" element={<Pedidos />} />
                <Route path="/app/produtos" element={<Produtos />} />
                <Route path="/app/delivery" element={<Delivery />} />
                <Route path="/app/config" element={<Config />} />
                {/*-----------------------------------------------------------*/}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
