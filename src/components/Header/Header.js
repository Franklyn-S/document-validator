import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { LogoutButton } from './style';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated());
  });
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
            {isUserAuthenticated && (
              <li>
                <a href="/documents">Documentos</a>
              </li>
            )}
            {isUserAuthenticated && (
              <li>
                <LogoutButton onClick={logout} style={{ cursor: 'pointer' }}>
                  Logout
                </LogoutButton>
              </li>
            )}
            {!isUserAuthenticated && (
              <li>
                <a href="/">Logar</a>
              </li>
            )}
            {!isUserAuthenticated && (
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
