import React from 'react';

const MorePage: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: '#1A1A1A',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'left',
      marginTop: '20px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    heading: {
      fontSize: '1.6rem',
      color: '#E4E4E7',
      marginBottom: '15px',
    },
    paragraph: {
      fontSize: '1rem',
      color: '#B3B3B3',
      marginBottom: '15px',
    },
    linkContainer: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    link: {
      display: 'inline-block',
      padding: '10px 15px',
      background: 'linear-gradient(45deg, #00EFFF, #00D8FF)',
      color: '#121212',
      fontWeight: 'bold',
      fontSize: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      textDecoration: 'none',
      border: '2px solid transparent',
      transition: 'all 0.3s ease-in-out, background 0.5s ease-in-out',
    },
    linkHover: {
      background: 'linear-gradient(45deg, #00D8FF, #00EFFF)',
      color: '#FFFFFF',
      border: '2px solid #00D8FF',
      boxShadow: '0 0 12px rgba(0, 216, 255, 0.7)',
      transform: 'scale(1.08)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>추가 정보</h2>
      <p style={styles.paragraph}>
        이더리움과 비트코인의 백서를 직접 다운로드하여 더 깊이 있는 내용을 확인하세요.
      </p>
      <div style={styles.linkContainer}>
        <a
          href="https://ethereum.org/ko/whitepaper/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          📄 이더리움 백서 보기
        </a>
        <a
          href="/files/bitcoin_ko.pdf"
          download="bitcoin_whitepaper.pdf"
          style={styles.link}
        >
          📄 비트코인 백서 다운로드
        </a>
      </div>
    </div>
  );
};

export default MorePage;
