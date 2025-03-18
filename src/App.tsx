import React, { useState, useEffect, useCallback } from 'react';
import { createWallet, getBalance, prepareTransaction, sendTransaction, getTransactionStatus, web3 } from './utils/web3';
import './App.css';
import image from './image.png';

interface Wallet {
  address: string;
  privateKey: string;
}

interface TransactionReceipt {
  transactionHash: string;
  from: string;
  to: string;
  confirmations?: number;
}

interface TransactionData {
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
}

function App() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt | null>(null);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [pendingTx, setPendingTx] = useState<TransactionData | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCreateWallet = () => {
    const newWallet = createWallet();
    setWallet(newWallet);
    setBalance(null);
    setTxReceipt(null);
    setTxStatus(null);
  };

  const handleGetBalance = useCallback(async () => {
    if (!wallet) return;
    const balanceETH = await getBalance(wallet.address);
    setBalance(balanceETH);
  }, [wallet]);

  const handlePrepareTransaction = async () => {
    if (!wallet || !recipient || !amount) return;
    
    try {
      const tx = await prepareTransaction(wallet.address, recipient, amount);
      setPendingTx({
        ...tx,
        gas: Number(tx.gas),
        gasPrice: tx.gasPrice.toString(),
      });
      setIsConfirming(true);
    } catch (error) {
      console.error("🚨 Error preparing transaction:", error);
    }
  };

  const handleSendTransaction = async () => {
    if (!wallet || !pendingTx) return;
    try {
      setTxReceipt(null);
      setTxStatus("Pending");
      setLoadingReceipt(true);
      const receipt = await sendTransaction(wallet.privateKey, pendingTx);
      setTxReceipt(receipt);
      setLoadingReceipt(false);
      setPendingTx(null);
      setIsConfirming(false);
      await handleGetBalance();
    } catch (error) {
      console.error('❌ Transaction Failed:', error);
      setTxStatus("Failure");
      setLoadingReceipt(false);
      setIsConfirming(false);
    }
  };

  const handleCancelTransaction = () => {
    setPendingTx(null);
    setIsConfirming(false);
  };

  useEffect(() => {
    if (txReceipt && txReceipt.transactionHash) {
      setTxStatus("Pending");
      let isCompleted = false;

      const interval = setInterval(async () => {
        if (isCompleted) return;
        try {
          console.log(`🔄 Checking status for: ${txReceipt.transactionHash}`);
          const status = await getTransactionStatus(txReceipt.transactionHash);
          console.log(`✅ Transaction status: ${status}`);
          setTxStatus(status);

          if (status === "Complete" || status === "Failure") {
            isCompleted = true;
            clearInterval(interval);
            await handleGetBalance();
          }
        } catch (error) {
          console.error("🚨 Error fetching transaction status:", error);
          setTxStatus("Pending");
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [txReceipt, handleGetBalance]);

  const formatTxHash = (hash: string) => {
    return hash ? `${hash.substring(0, 6)}......${hash.substring(hash.length - 6)}` : '';
  };

  const formatAddress = (address: string) => {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  };

  return (
    <div className="container">
      <img src={image} alt="Hana Financial Group" className="image" />

      {!wallet ? (
        <button className="primary-btn" onClick={handleCreateWallet}>Create New Wallet</button>
      ) : (
        <div className="wallet-card">
          <p className="wallet-address"><strong>Address:</strong> {wallet.address}</p>
          <button className="primary-btn" onClick={handleGetBalance}>Check Balance</button>
          {balance !== null && <p className="wallet-balance"><strong>Balance:</strong> {parseFloat(balance).toFixed(3)} KAIA</p>}

          <h3 className="send-transaction-title">Send Transaction</h3>
          <input type="text" className="input-field" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <input type="text" className="input-field" placeholder="Amount (Kaia)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className="primary-btn" onClick={handlePrepareTransaction} disabled={!recipient || !amount}>Send</button>

          {isConfirming && pendingTx && (
            <div className="modal">
              <div className="modal-content">
                <h3>Confirm Transaction</h3>
                <div className="transaction-detail">
                  <p>
                    <strong>To:</strong>
                    <span title={pendingTx.to}>{formatAddress(pendingTx.to)}</span>
                  </p>
                  <p>
                    <strong>Amount:</strong>
                    <span className="amount-value">{web3.utils.fromWei(pendingTx.value, 'ether')} Kaia</span>
                  </p>
                </div>
                <div className="modal-buttons">
                  <button className="confirm-send" onClick={handleSendTransaction}>Confirm & Send</button>
                  <button className="cancel-btn" onClick={handleCancelTransaction}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {(txReceipt || loadingReceipt) && (
            loadingReceipt ? (
              <div className="loading-section">
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
                <div>
                  <p className="loading-message">Processing Transaction</p>
                  <p className="loading-submessage">Please wait...</p>
                </div>
              </div>
            ) : txReceipt ? (
              <div className="receipt-card">
                <h3 className="receipt-header">Transaction Receipt</h3>
                <div className="receipt-info">
                  <span className="receipt-label">Tx Hash:</span>
                  <a className="receipt-value receipt-link" href={`https://kairos.kaiascan.io/tx/${txReceipt.transactionHash}`} target="_blank" rel="noopener noreferrer">
                    {formatTxHash(txReceipt.transactionHash)}
                  </a>
                </div>
                <div className="receipt-info">
                  <span className="receipt-label">From:</span>
                  <span className="receipt-value" title={txReceipt.from}>{formatAddress(txReceipt.from)}</span>
                </div>
                <div className="receipt-info">
                  <span className="receipt-label">To:</span>
                  <span className="receipt-value" title={txReceipt.to}>{formatAddress(txReceipt.to)}</span>
                </div>
                <div className="receipt-info">
                  <span className="receipt-label">Status:</span>
                  <span className={`receipt-value ${txStatus === "Complete" ? "status-complete" : txStatus === "Failure" ? "status-failure" : "status-pending"}`}>
                    {txStatus}
                  </span>
                </div>
                <button className="cancel-btn" onClick={() => setTxReceipt(null)}>Close</button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default App;