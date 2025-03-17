import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HTMLPage from './pages/HTMLPage';
import JSPage from './pages/JSPage';
import TypeScriptPage from './pages/TypeScriptPage';
import MorePage from './pages/MorePage';  // ✅ "더보기"를 위한 새 페이지 추가
import './App.css';

function App() {
  return (
    <Router basename="/blog">
      <div className="App">
        <header className="App-header">
          <h1>bitcoin vs. ethereum</h1>
        </header>

        <div className="App-container">
          {/* ✅ 왼쪽 사이드바 */}
          <aside className="Sidebar left">
            <nav>
              <ul>
                <li><Link to="/html">비트코인</Link></li>
                <li><Link to="/js">이더리움</Link></li>
                <li><Link to="/typescript">분석</Link></li>
                <li><Link to="/more" className="more-button">더보기</Link></li>  {/* ✅ 더보기 경로 수정 */}
              </ul>
            </nav>
          </aside>

          {/* ✅ 메인 콘텐츠 */}
          <main className="Content">
            <Routes>
              <Route path="/html" element={<HTMLPage />} />
              <Route path="/js" element={<JSPage />} />
              <Route path="/typescript" element={<TypeScriptPage />} />
              <Route path="/more" element={<MorePage />} />  {/* ✅ 더보기 페이지 경로 추가 */}
            </Routes>
          </main>

          {/* ✅ 오른쪽 사이드바 복구 */}
          <aside className="Sidebar right">
            <h3>관련 뉴스</h3>
            <p>비트코인과 이더리움의 최신 동향을 확인하세요!</p>
            <ul className="news-links">
              <li>
                <a href="https://biz.sbs.co.kr/article/20000221969" target="_blank" rel="noopener noreferrer">
                  👉 SBS 비즈 기사 보기
                </a>
              </li>
              <li>
                <a href="https://biz.heraldcorp.com/article/10438285" target="_blank" rel="noopener noreferrer">
                  👉 헤럴드경제 기사 보기
                </a>
              </li>
              <li>
                <a href="https://www.digitaltoday.co.kr/news/articleView.html?idxno=556487" target="_blank" rel="noopener noreferrer">
                  👉 디지털투데이 기사 보기
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </Router>
  );
}

export default App;
