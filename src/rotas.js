/**
 * Rotas de Navegação
 */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* páginas */

import Site from "./site/site.jsx";
import Login from "./app/login/login.jsx";
import Novo from "./app/login/novo.jsx";
import Reset from "./app/login/reset.jsx";
import Pedidos from "./app/pedidos";
import Produtos from "./app/produtos";
import Extras from "./app/extras";
import Delivery from "./app/delivery";
import Config from "./app/config";

import SecureRoute from "./components/route/protected.js";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Site/>} />
                <Route path='/app/login' element={<Login/>} />
                <Route path='/app/login/novo' element={<Novo/>} />
                <Route path='/app/login/reset' element={<Reset/>} />
                {/* SecureRoutes */}
                <Route path="/app/pedidos" element={
                    <SecureRoute>
                        <Pedidos/> 
                    </SecureRoute>
                } />
                <Route path="/app/produtos" element={
                    <SecureRoute>
                        <Produtos/>
                    </SecureRoute>
                } />
                <Route path="/app/extras" element={
                    <SecureRoute>
                        <Extras/>
                    </SecureRoute>
                } />
                <Route path="/app/delivery" element={
                    <SecureRoute>
                        <Delivery/>
                    </SecureRoute>
                } />
                <Route path="/app/config" element={
                    <SecureRoute>
                        <Config/>
                    </SecureRoute>
                } />
                {/* SecureRoutes */}
                </Routes>
        </BrowserRouter>
    )
}
