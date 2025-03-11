import React from 'react';

const HTMLPage: React.FC = () => {
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
    list: {
      listStyle: 'disc',
      paddingLeft: '20px',
    },
    listItem: {
      fontSize: '1rem',
      color: '#E4E4E7',
      marginBottom: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>비트코인</h2>
      <p style={styles.paragraph}>
        비트코인은 개인 대 개인(P2P) 전자 화폐 시스템으로, 신뢰받는 제삼자 없이 온라인 결제를 가능하게 합니다.
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>P2P 네트워크 기반 거래:사용자 간 직접 송금이 가능하며, 중앙 서버 없이 운영</li>
        <li style={styles.listItem}>작업증명을 통한 합의: 채굴자들이 연산력을 사용해 트랜잭션을 검증하고 블록을 생성</li>
        <li style={styles.listItem}>이중 지급 방지: 동일한 비트코인을 중복 사용하지 못하도록 블록체인이 검증</li>
        <li style={styles.listItem}>블록체인으로 거래 기록 유지: 모든 거래 내역이 분산 원장에 영구 저장</li>
        <li style={styles.listItem}>비가역적 거래를 통한 보안성 강화: 거래 한 번 승인되면 되돌릴 수 없어 해킹위험 감소</li>
      </ul>
    </div>
  );
};

export default HTMLPage;