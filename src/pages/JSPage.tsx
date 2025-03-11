import React from 'react';

const JSPage: React.FC = () => {
  // ✅ 최소한의 스타일만 적용 (레이아웃 정리)
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
      <h2 style={styles.heading}>이더리움</h2>
      <p style={styles.paragraph}>
        이더리움은 탈중앙화된 애플리케이션(DApp)을 개발하기 위한 플랫폼으로, 스마트 컨트랙트를 통해 다양한 기능을 구현할 수 있습니다.
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>스마트 컨트랙트: 조건이 충족되면 자동으로 실행되는 계약</li>
        <li style={styles.listItem}>이더리움 가상 머신(EVM): 튜링 완전성을 갖춘 코드 실행 환경</li>
        <li style={styles.listItem}>계정 기반 모델: 외부 소유 계정과 컨트랙트 계정으로 구성</li>
        <li style={styles.listItem}>토큰 생성: ERC-20 등 표준을 통해 새로운 토큰 발행 가능</li>
        <li style={styles.listItem}>탈중앙화된 자율 조직(DAO): 코드에 의해 운영되는 조직</li>
      </ul>
    </div>
  );
};

export default JSPage;
