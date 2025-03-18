import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders wallet creation button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Create New Wallet/i);
  expect(buttonElement).toBeInTheDocument();
});

test('creates wallet when button is clicked', async () => {
  render(<App />);
  
  const createWalletButton = screen.getByText(/Create New Wallet/i);
  fireEvent.click(createWalletButton); // Click to create a wallet

  // Wait for wallet address to appear (async check)
  const addressElement = await screen.findByText(/Address:/i);
  expect(addressElement).toBeInTheDocument();
});

test('renders check balance and send transaction buttons after wallet creation', async () => {
  render(<App />);
  
  // Create wallet first
  const createWalletButton = screen.getByText(/Create New Wallet/i);
  fireEvent.click(createWalletButton);
  
  // Wait for UI to update with balance and send buttons
  const checkBalanceButton = await screen.findByText(/Check Balance/i);
  const sendButton = await screen.findByText(/Send/i);

  expect(checkBalanceButton).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();
});

test('allows user to enter recipient address and amount', async () => {
  render(<App />);
  
  // Create wallet first
  const createWalletButton = screen.getByText(/Create New Wallet/i);
  fireEvent.click(createWalletButton);

  // Wait for UI update
  await screen.findByText(/Address:/i);

  // Enter recipient address
  const recipientInput = screen.getByPlaceholderText(/Recipient Address/i);
  fireEvent.change(recipientInput, { target: { value: '0x1234567890abcdef' } });
  expect(recipientInput).toHaveValue('0x1234567890abcdef');

  // Enter transaction amount
  const amountInput = screen.getByPlaceholderText(/Amount \(ETH\)/i);
  fireEvent.change(amountInput, { target: { value: '0.1' } });
  expect(amountInput).toHaveValue('0.1');
});
