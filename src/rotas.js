/**
 * src/rotas.jsx
 */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** rotas */

import Site from "./site/site.jsx";

import Login from "./app/login/login.jsx";
import NewAccount from "./app/login/novo.jsx";
import Reset from "./app/login/reset.jsx";

import Pedidos from "./app/menu/pedidos/index.jsx";
import Produtos from "./app/menu/produtos/index.jsx";
import Extras from "./app/menu/extras/index.jsx";
import Delivery from "./app/menu/delivery/index.jsx";

import PrivateRoute from "./components/route/protected.js";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site />} />
                <Route path='/app/login' element={<Login />} />
                <Route path='/app/login/novo' element={<NewAccount />} />
                <Route path='/app/login/reset' element={<Reset />} />
                {/* Secure Routes */}
                <Route path="/app/pedidos" element={
                    <PrivateRoute>
                        <Pedidos />
                    </PrivateRoute>
                } />
                <Route path="/app/produtos" element={
                    <PrivateRoute>
                        <Produtos />
                    </PrivateRoute>
                } />
                <Route path="/app/extras" element={
                    <PrivateRoute>
                        <Extras />
                    </PrivateRoute>
                } />
                <Route path="/app/delivery" element={
                    <PrivateRoute>
                        <Delivery />
                    </PrivateRoute>
                } />
                {/* Secure Routes */}
            </Routes>
        </BrowserRouter>
    )
}
