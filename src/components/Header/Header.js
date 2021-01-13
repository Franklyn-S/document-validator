import React, {useState} from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='/'>
            Validador de documentos
          </a>
        </div>
        <div className='navbar-default'>
          <ul className='nav navbar-nav'>
            {isAuthenticated && (
              <li>
                <a href='/documents'>Documentos</a>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button onClick={() => {}} style='cursor: pointer;'>
                  Logout
                </button>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <a href='/'>Logar</a>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <a href='/register'>Cadastre-se</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
