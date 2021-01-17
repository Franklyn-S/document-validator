import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { LogoutButton } from './style';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Validador de documentos
          </a>
        </div>
        <div className="navbar-default">
          <ul className="nav navbar-nav">
            {isAuthenticated() && (
              <li>
                <a href="/documents">Documentos</a>
              </li>
            )}
            {isAuthenticated() && (
              <li>
                <a href="/" onClick={logout} style={{ cursor: 'pointer' }}>
                  Logout
                </a>
              </li>
            )}
            {!isAuthenticated() && (
              <li>
                <a href="/">Logar</a>
              </li>
            )}
            {!isAuthenticated() && (
              <li>
                <a href="/register">Cadastre-se</a>
              </li>
            )}
            <li>
              <a href="/validate-document">Validar Documento</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
