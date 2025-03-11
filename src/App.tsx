import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HTMLPage from './pages/HTMLPage';
import CSSPage from './pages/CSSPage';
import JSPage from './pages/JSPage';
import ReactPage from './pages/ReactPage';
import TypeScriptPage from './pages/TypeScriptPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="로고" className="App-logo" />
          <h1>로켓부스트 <br></br> 블록체인 엔지니어 Track 1기</h1>
          <nav>
            <ul>
              <li><Link to="/html">HTML</Link></li>
              <li><Link to="/css">CSS</Link></li>
              <li><Link to="/js">JavaScript</Link></li>
              <li><Link to="/react">React</Link></li>
              <li><Link to="/typescript">TypeScript</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/html" element={<HTMLPage />} />
            <Route path="/css" element={<CSSPage />} />
            <Route path="/js" element={<JSPage />} />
            <Route path="/react" element={<ReactPage />} />
            <Route path="/typescript" element={<TypeScriptPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
