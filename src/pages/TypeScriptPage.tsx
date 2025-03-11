import React from 'react';

const TypeScriptPage: React.FC = () => {
  // ✅ 스타일 설정
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: '#1A1A1A',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      marginTop: '20px',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    heading: {
      fontSize: '1.8rem',
      color: '#E4E4E7',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1rem',
      color: '#B3B3B3',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
    },
    th: {
      backgroundColor: '#333',
      color: '#00D8FF',
      padding: '10px',
      border: '1px solid #444',
    },
    td: {
      padding: '10px',
      border: '1px solid #444',
      color: '#E4E4E7',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>비트코인 vs 이더리움</h2>
      <p style={styles.paragraph}>비트코인과 이더리움의 주요 차이점을 비교한 표 </p>

      {/* ✅ 비교 테이블 추가 */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>구분</th>
            <th style={styles.th}>비트코인</th>
            <th style={styles.th}>이더리움</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>출시년도</td>
            <td style={styles.td}>2009년</td>
            <td style={styles.td}>2015년</td>
          </tr>
          <tr>
            <td style={styles.td}>창시자</td>
            <td style={styles.td}>사토시 나카모토</td>
            <td style={styles.td}>비탈릭 부테린</td>
          </tr>
          <tr>
            <td style={styles.td}>목적</td>
            <td style={styles.td}>디지털 금, 가치 저장</td>
            <td style={styles.td}>스마트 컨트랙트 플랫폼</td>
          </tr>
          <tr>
            <td style={styles.td}>합의 알고리즘</td>
            <td style={styles.td}>작업증명 (PoW)</td>
            <td style={styles.td}>지분증명 (PoS, Ethereum 2.0)</td>
          </tr>
          <tr>
            <td style={styles.td}>총 공급량</td>
            <td style={styles.td}>2100만 개</td>
            <td style={styles.td}>무제한 (EIP-1559 도입 후 조절 가능)</td>
          </tr>
          <tr>
            <td style={styles.td}>거래 속도</td>
            <td style={styles.td}>10분</td>
            <td style={styles.td}>15초</td>
          </tr>
          <tr>
            <td style={styles.td}>사용 사례</td>
            <td style={styles.td}>가치 저장, 결제</td>
            <td style={styles.td}>DApp, DeFi, NFT</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TypeScriptPage;
