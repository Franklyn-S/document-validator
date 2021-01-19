import React from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout, isUserAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand"
        href={`${
          isAuthenticated()
            ? '/document-validator/documents'
            : '/document-validator/'
        }`}
      >
        Validador de documentos
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
        itemID="navbarNav"
      >
        <ul className="navbar-nav">
          {isAuthenticated() && (
            <li className="nav-item">
              <a className="nav-link" href="/document-validator/documents">
                Documentos
              </a>
            </li>
          )}
          <li className="nav-item">
            <a
              className="nav-link"
              href="/document-validator/validate-document"
            >
              Validar Documento
            </a>
          </li>
          {isAuthenticated() && isUserAdmin() && (
            <li className="nav-item">
              <a className="nav-link" href="/document-validator/admin-area">
                Area do Administrador
              </a>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <a
                className="nav-link"
                href="/document-validator/"
                onClick={logout}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </a>
            </li>
          )}
          {!isAuthenticated() && (
            <li className="nav-item">
              <a className="nav-link" href="/document-validator/">
                Logar
              </a>
            </li>
          )}
          {!isAuthenticated() && (
            <li className="nav-item">
              <a className="nav-link" href="/document-validator/register">
                Cadastre-se
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
