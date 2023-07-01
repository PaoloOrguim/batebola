import React from 'react';
import logo from './bola.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Background"></div> {/* Adicionado o elemento de fundo */}
      <header className="App-header">
        <a className="LogoSite" target="_blank" rel="noopener noreferrer">
          BateBola
        </a>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Divisoria"></div>
        <div className="Content">
          <nav className="Menu">
            <ul className="Menu-list">
              <li className="Menu-item">Futebol</li>
              <li className="Menu-item">Society</li>
              <li className="Menu-item">Vôlei</li>
              <li className="Menu-item">Futsal</li>
              <li className="Menu-item">Basquete</li>
            </ul>
          </nav>
          {/* Conteúdo adicional, como cards de anúncios */}
        </div>
      </header>
    </div>
  );
}

export default App;
