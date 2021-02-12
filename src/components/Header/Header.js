import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const Header = () => {
  const { signedInUser, setSignedInUser } = useContext(UserContext);
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a
        className='navbar-brand'
        href={`${
          signedInUser
            ? "/document-validator/documents"
            : "/document-validator/"
        }`}
      >
        Validador de documentos
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className='collapse navbar-collapse'
        id='navbarNav'
        itemID='navbarNav'
      >
        <ul className='navbar-nav'>
          {signedInUser && (
            <li className='nav-item'>
              <a className='nav-link' href='/document-validator/documents'>
                Documentos
              </a>
            </li>
          )}
          <li className='nav-item'>
            <a
              className='nav-link'
              href='/document-validator/validate-document'
            >
              Validar Documento
            </a>
          </li>
          {signedInUser && signedInUser.isAdmin && (
            <li className='nav-item'>
              <a className='nav-link' href='/document-validator/admin-area'>
                Area do Administrador
              </a>
            </li>
          )}
          {signedInUser && (
            <li className='nav-item'>
              <a
                className='nav-link'
                href='/document-validator/'
                onClick={() => {
                  sessionStorage.setItem("user", null);
                  setSignedInUser(null);
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            </li>
          )}
          {!signedInUser && (
            <li className='nav-item'>
              <a className='nav-link' href='/document-validator/'>
                Logar
              </a>
            </li>
          )}
          {!signedInUser && (
            <li className='nav-item'>
              <a className='nav-link' href='/document-validator/register'>
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
