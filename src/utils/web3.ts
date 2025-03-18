import Web3 from 'web3';

export const web3 = new Web3('https://public-en-kairos.node.kaia.io');

// Account 타입 정의
interface Account {
  address: string;
  privateKey: string;
  signTransaction: Function;
  sign: Function;
  encrypt: Function;
}

// 트랜잭션 상태 확인 함수 개선
export const getTransactionStatus = async (txHash: string): Promise<string> => {
  try {
    const response = await fetch(`https://kairos.kaiascan.io/api/tx/${txHash}`);
    const data = await response.json();

    if (data && data.status) {
      if (data.status.toLowerCase() === "success") return "Complete";
      if (data.status.toLowerCase() === "failed") return "Failure";
    }

    const receipt = await web3.eth.getTransactionReceipt(txHash);
    if (receipt) {
      return receipt.status ? "Complete" : "Failure";
    }

    return "Pending";
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    try {
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      if (receipt) {
        return receipt.status ? "Complete" : "Failure";
      }
      return "Pending";
    } catch (web3Error) {
      console.error("Web3 fallback failed:", web3Error);
      return "Unknown";
    }
  }
};

// 지갑 생성
export const createWallet = (): Account => {
  return web3.eth.accounts.create() as Account;
};

// 잔액 조회
export const getBalance = async (address: string): Promise<string> => {
  try {
    const balanceWei = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balanceWei, 'ether');
  } catch (error) {
    console.error("❌ Error fetching balance:", error);
    return "0";
  }
};

// 트랜잭션 준비
export const prepareTransaction = async (from: string, to: string, amount: string) => {
  try {
    const value = web3.utils.toWei(amount, 'ether');
    const gasPrice = (await web3.eth.getGasPrice()).toString();
    const gasLimit = 21000;

    return { from, to, value, gas: gasLimit, gasPrice };
  } catch (error) {
    console.error("❌ Error preparing transaction:", error);
    throw error;
  }
};

// 트랜잭션 영수증 대기 함수
const getReceiptWithRetry = async (txHash: string, maxRetries = 20, interval = 3000) => {
  for (let i = 0; i < maxRetries; i++) {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    if (receipt) {
      console.log(`✅ Receipt found after ${i + 1} attempts`);
      return receipt;
    }
    console.log(`⏳ Waiting for transaction receipt... Attempt ${i + 1}/${maxRetries}`);
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("❌ Transaction receipt not found after multiple attempts.");
};

// 트랜잭션 전송
export const sendTransaction = async (privateKey: string, tx: any): Promise<any> => {
  try {
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('🔹 Transaction Sent:', sentTx.transactionHash);

    const receipt = await getReceiptWithRetry(sentTx.transactionHash.toString());

    console.log('✅ Transaction Mined:', receipt);

    const initialStatus = receipt.status ? "Complete" : "Failure";
    console.log(`🔍 Initial transaction status: ${initialStatus}`);
    return receipt;
  } catch (error) {
    console.error('❌ Transaction Failed:', error);
    throw error;
  }
};

// 트랜잭션 확인 수 조회
export async function getTransactionReceipt(txHash: string) {
  try {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    if (!receipt) return 0;

    const latestBlock = await web3.eth.getBlockNumber();
    return latestBlock - receipt.blockNumber;
  } catch (error) {
    console.error("❌ 트랜잭션 확인 실패:", error);
    return 0;
  }
}